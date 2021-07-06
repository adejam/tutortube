import Link from 'next/link';
import Head from 'next/head';

const PageNotFound = () => {

  return (
    <div className="not-found">
      <Head>
        <title>Tutortube | 404</title>
      </Head>
      <h1>Ooops...</h1>
      <h2>Page not Found :(</h2>
      <p>
        Go back to the
        {' '}
        <Link href="/">
          <a>Homepage</a>
        </Link>
        {' '}
      </p>
    </div>
  );
};

export default PageNotFound;
