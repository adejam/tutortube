import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'

type Option = {
  key: string;
  value: string;
}

export interface FormikControlProps {
  control: string;
  type: string;
  label: string;
  name: string;
  options: Option[];
}

const FormikControl: React.FunctionComponent<FormikControlProps> = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    default:
      return null
  }
}

export default FormikControl
