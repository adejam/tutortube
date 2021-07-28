import * as Yup from 'yup';

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
    .required('This field is required'),
});

export default CommentSchema