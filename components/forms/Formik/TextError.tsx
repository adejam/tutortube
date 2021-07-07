import { ReactNode } from "react"

export interface TextErrorProps {
  children?: ReactNode;
}

const TextError: React.FunctionComponent<TextErrorProps> = ({ children }):JSX.Element => {
  return <div className='text-danger'>{children}</div>
}

export default TextError
