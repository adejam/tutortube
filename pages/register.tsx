import Head from 'next/head'
  import RegisterForm from '../components/forms/RegisterForm'

const register = () => {
    return (
        <>
        <Head>
        <title>Tutortube | Register</title>
        </Head>
        <RegisterForm />
        </>
    )
}

export default register