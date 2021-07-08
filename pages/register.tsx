import Head from 'next/head'
  import RegisterForm from '../components/forms/RegisterForm'

const register = ():JSX.Element => {
    return (
      <div className="mw-1200 mt-50">
        <Head>
        <title>Tutortube | Register</title>
        </Head>
        <RegisterForm />
        </div>
    )
}

export default register