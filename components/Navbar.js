import React from 'react'
import Link from 'next/link';
import {useRouter} from 'next/router'

const Navbar = () => {
    const router = useRouter()
    
    function isActive(route){
        if(route === router.pathname)
        {
            return "active"
        }
        else ""

    }


    return (
         <nav>
    <div className="nav-wrapper">
      <Link href="/" className="brand-logo">Logo</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li className={isActive('/login')}><Link href="/login">Login</Link></li>
        <li className={isActive('/signup')}><Link href="/signup">sign up</Link></li>
        <li className={isActive('/create')}><Link href="/create">create</Link></li>
      </ul>
    </div>
  </nav>
    )
}

export default Navbar
