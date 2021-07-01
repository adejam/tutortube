import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input ({ label, name, ...rest }) {
  return (
    <div className='d-flex flex-column mb-10'>
      <label htmlFor={name}>{label}</label>
      <Field className="form-control" id={name} name={name} {...rest} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input
