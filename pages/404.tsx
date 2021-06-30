import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const PageNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div className="not-found">
      <Head>
        <title>Tutortube | 404</title>
      </Head>
      <h1>Ooops...</h1>
      <h2>This page cannot be found :(</h2>
      <p>
        Going back to the
        {' '}
        <Link href="/">
          <a>Homepage</a>
        </Link>
        {' '}
        in 3 seconds...
      </p>
    </div>
  );
};

export default PageNotFound;
