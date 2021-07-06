import { Formik, Form, FormikHelpers } from "formik";
import FormikControl from "./Formik/FormikControl";
import LoginSchema from "../../schemas/login.schema";
import { configHeader, server } from "../../config";
import Axios from "axios";
import jscookie from "js-cookie";
import { useRouter } from "next/router";

export interface LoginFormProps {}

interface Values {
  email: string;
  password: string;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  
  const router = useRouter();
  const onSubmit = (values: Values) => {
    Axios.post(`/login`, values, configHeader)
      .then((res) => {
        const data = res.data;
        const body = JSON.stringify({ token: data.token });
        Axios.post(`${server}/login`, body, configHeader)
          .then((res) => {
            const { success } = res.data;
            if (success) {
              jscookie.set("role", data.role, { expires: 1 / 24, path: "/" });
              jscookie.set("username", data.username, {
                expires: 1 / 24,
                path: "/",
              });
              router.back();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              options={[]}
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              options={[]}
            />
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
