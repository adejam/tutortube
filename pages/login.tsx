import Head from 'next/head'
import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const login = ():JSX.Element => {
    return (
        <>
        <Head>
        <title>Tutortube | Login</title>
        </Head>
            <LoginForm />
        </>
    )
}

export default login