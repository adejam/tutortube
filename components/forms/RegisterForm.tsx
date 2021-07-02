import { Formik, Form } from "formik";
import FormikControl from "./Formik/FormikControl";
import RegistrationSchema from "../../schemas/registration.schema";
import Axios from 'axios';
import { baseApiUrl, configHeader, server } from '../../config'

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

  const onSubmit = (values: Values) => {
    // Axios.post(`${server}/sanctum/csrf-cookie`, values, configHeader)
    Axios.post(`/register`, values, configHeader)
      .then((res) => {
        const data = res.data;
        const body = JSON.stringify({ token: data.token});
        Axios.post(`${server}/register`, body, configHeader)
        .then((res) => {
          console.log(res.data);
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
{/* 
            <FormikControl
              control="input"
              type="text"
              label="Name"
              name="role"
              options={[]}
            /> */}

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
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
