import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

type Option = {
  key: string;
  value: string;
}

export interface SelectProps {
  label: string;
  name: string;
  options: Option[];
}

const Select: React.FunctionComponent<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field as='select' id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Select
