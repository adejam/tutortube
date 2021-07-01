import { Formik, Form } from 'formik'
import FormikControl from './Formik/FormikControl'
import RegistrationSchema from '../../schemas/registration.schema'  

export interface RegisterFormProps {}

interface Values {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const RegisterForm: React.FunctionComponent<RegisterFormProps> = () => {
      const initialValues = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    
      const onSubmit = (values: Values) => {
        console.log('Form data', values)
      }
    
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
                  control='input'
                  type='text'
                  label='Name'
                  name='name'
                />

                <FormikControl
                  control='input'
                  type='email'
                  label='Email'
                  name='email'
                />
                <FormikControl
                  control='input'
                  type='password'
                  label='Password'
                  name='password'
                />
                <FormikControl
                  control='input'
                  type='password'
                  label='Confirm Password'
                  name='password_confirmation'
                />
                <button type='submit' disabled={!formik.isValid}>
                  Submit
                </button>
              </Form>
            )
          }}
        </Formik>
      )
};

export default RegisterForm;
