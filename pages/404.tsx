import Link from 'next/link';
import Head from 'next/head';

const PageNotFound = () => {

  return (
    <div className="not-found">
      <Head>
        <title>Tutortube | 404</title>
      </Head>
      <h1>Ooops...</h1>
      <h2>An Error Occurred. Try :(</h2>
      <ol>
        <li>Checking if your the URL exist</li>
        <li>Checking your internet connection</li>
      </ol>
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
