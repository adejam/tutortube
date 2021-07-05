import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  const categories = [
    {category: 'html'},
   {category: 'css'},
  {category: 'javascript'}, 
  {category:'react'}, 
  {category: 'next'},
  {category: 'bootstrap'}]
  return (
    <>
      <Head>
        <title>Tutortube | Home</title>
      </Head>
      <h1 className={`${styles.title} ta-center my-10` }>Welcome to Tutortube</h1>
      {categories.map((category, index) => (
          <div key={index}>
          <Link href={`/videos/${category.category}`} >
          <a>{category.category}</a>
          </Link>
          </div>
        
      ))}

    </>
  )
}
