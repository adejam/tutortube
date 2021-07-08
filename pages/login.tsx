import Head from 'next/head'
import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const login = ():JSX.Element => {
    return (
        <div className="mx-auto mw-1200 mt-50">
        <Head>
        <title>Tutortube | Login</title>
        </Head>
            <LoginForm />
        </div>
    )
}

export default login