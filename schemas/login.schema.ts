import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field is required')
    .email('Should be a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Should be atleast 8 characters'),
});

export default LoginSchema
