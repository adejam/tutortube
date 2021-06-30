import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tutortube | Home</title>
      </Head>
      <h1 className={`${styles.title} ta-center my-10` }>Welcome to Tutortube</h1>
    </>
  )
}
