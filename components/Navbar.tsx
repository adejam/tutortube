import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import jscookie from "js-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useState({username: '', role: ''});

   async function setTheCookies (username: any, role: any) {
    setCookies({
      ...cookies,
      username: username,
      role: role,
    })
  }

  useEffect(() => {
    setTimeout(()=>{
      const username: any = jscookie.get('username');
      const role: any = jscookie.get('role');
      setTheCookies(username, role)
    }, 1000); 
  },[]);

    const {username, role} = cookies;
    console.log(username);
    console.log(role);
  return (
  <header className="bb-block bg-white">
    <nav className="d-flex justify-between mx-auto align-center">
      <div className="brand ml-10">
        <Link href="/">
          <a>
            <b>TutorTube</b>
          </a>
        </Link>
      </div>
      <ul className="d-flex mr-10">
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {username && (
        <li className="d-flex justify-center align-center mr-10">
          <span>{username}</span>
        </li>
        )
        }
        {(role && role !== "authenticated") && (
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/admin">
            <a>Admin</a>
          </Link>
        </li>
        )
        }
        {!username && (
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        )
        }
        {!username ? (
        <li className="d-flex justify-center align-center mr-10">
          <Link href="/register">
            <a>Sign Up</a>
          </Link>
        </li>
        ) :
        (
          <li className="d-flex justify-center align-center mr-10">
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </li>
        )
}
        
      </ul>
    </nav>
  </header>
);
  }

export default Navbar;
