import * as Yup from 'yup';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('This field is required'),
  email: Yup.string()
    .required('This field is required')
    .email('Should be a valid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Should be atleast 8 characters'),
  password_confirmation: Yup.string()
    .required('You need to confirm your password')
    .oneOf([Yup.ref('password'), null], 'Both password should match'),
});

export default RegistrationSchema
