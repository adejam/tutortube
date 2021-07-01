import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

export interface TextareaProps {
  label: string;
  name: string;
}

const Textarea: React.FunctionComponent<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea
