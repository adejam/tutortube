import { Formik, Form } from "formik";
import FormikControl from "./Formik/FormikControl";
import RegistrationSchema from "../../schemas/registration.schema";
import Axios from 'axios';
import { configHeader, server } from '../../config'
import jscookie from "js-cookie";
import { useRouter } from "next/router";

export interface RegisterFormProps {}

interface Values {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm: React.FunctionComponent<RegisterFormProps> = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const router = useRouter();
  const onSubmit = (values: Values) => {
    Axios.post(`/register`, values, configHeader)
      .then((res) => {
        const data = res.data;
        const body = JSON.stringify({ token: data.token});
        Axios.post(`${server}/register`, body, configHeader)
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
      validationSchema={RegistrationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="Name"
              name="name"
              options={[]}
            />

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
            <FormikControl
              control="input"
              type="password"
              label="Confirm Password"
              name="password_confirmation"
              options={[]}
            />
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
            <div className={formik.isSubmitting ? 'd-block' : 'd-none'}>Submitting...</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
