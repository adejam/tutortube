import { Formik, Form, FormikHelpers } from 'formik'
import FormikControl from './Formik/FormikControl'
import LoginSchema from '../../schemas/login.schema'

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
            console.log('Form data', values)
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