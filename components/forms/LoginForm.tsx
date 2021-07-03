import { Formik, Form, FormikHelpers } from 'formik'
import FormikControl from './Formik/FormikControl'
import LoginSchema from '../../schemas/login.schema'
import { configHeader, server } from '../../config';
import Axios from 'axios'

export interface LoginFormProps {
    
}

interface Values {
    email: string;
    password: string;
}
 
const LoginForm: React.FunctionComponent<LoginFormProps> = () => {
        const initialValues = {
            email: '',
            password: '',
          }
        
          const onSubmit = (values: Values) => {
            Axios.post(`/login`, values, configHeader)
      .then((res) => {
        const data = res.data;
        const body = JSON.stringify({ token: data.token});
        Axios.post(`${server}/login`, body, configHeader)
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
          }
        
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
                      control='input'
                      type='email'
                      label='Email'
                      name='email'
                      options={[]}
                    />
                    <FormikControl
                      control='input'
                      type='password'
                      label='Password'
                      name='password'
                      options={[]}
                    />
                    <button type='submit' disabled={!formik.isValid}>
                      Submit
                    </button>
                  </Form>
                )
              }}
            </Formik>
     );
};
 
export default LoginForm;