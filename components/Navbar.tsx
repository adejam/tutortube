import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => (
  <header className="bb-block bg-white">
    <nav className="d-flex justify-between mx-auto align-center">
      <div className="brand ml-10">
        <Link href="/">
          <a>
            <Image src="/vercel.svg" alt="site brand" width={150} height={40} />
          </a>
        </Link>
      </div>
      <ul className="d-flex mr-10">
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
