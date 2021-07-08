import { Formik, Form, FormikHelpers } from "formik";
import FormikControl from "./Formik/FormikControl";
import LoginSchema from "../../schemas/login.schema";
import { configHeader, server } from "../../config";
import Axios from "axios";
import jscookie from "js-cookie";
import { useRouter } from "next/router";

interface Values {
  email: string;
  password: string;
}

const LoginForm = ():JSX.Element => {
  const initialValues = {
    email: "",
    password: "",
  };
  
  const router = useRouter();
  const onSubmit = (values: Values, formikHelpers: FormikHelpers<any>) => {
    Axios.post(`/login`, values, configHeader)// a request is sent to the api-endpoint which returns a JWT token, username and role
      .then((res) => {
        const data = res.data;
        const body = JSON.stringify({ token: data.token }); // the token is stringified here
        Axios.post(`${server}/login`, body, configHeader) // the token is sent to api/register where it is used to create a token cookie
          .then((res) => {
            const { success } = res.data; // the response is checked if success returns true
            if (success) {
              jscookie.set("role", data.role, { expires: 1 / 24, path: "/" }); // the username and role data are used to create their corressponding cookies but are javascript cookies
              jscookie.set("username", data.username, {
                expires: 1 / 24,
                path: "/",
              });
              router.push('/'); // when the form is done then we redirect to welcome page
            }
          })
          // .catch(() => {
          // });
      })
      .catch(() => {
        formikHelpers.setSubmitting(false); // we stop submitting the form
        formikHelpers.resetForm();
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
          <Form className="max-w-500 mx-auto">
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
            <button type="submit" className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting}>
              Submit
            </button>
            <div className={formik.isSubmitting ? 'd-block' : 'd-none'}>Submitting...</div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
