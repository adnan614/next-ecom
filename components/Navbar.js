import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import cookie from "js-cookie";

const Navbar = () => {
  const router = useRouter();
  const cookieuser = parseCookies();

  const user = cookieuser.user
    ? JSON.parse(JSON.stringify(cookieuser.user))
    : "";

  function isActive(route) {
    if (route === router.pathname) {
      return "active";
    } else "";
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link href="/" className="brand-logo">
          Logo
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className={isActive("/cart")}>
            <Link href="/cart">Cart</Link>
          </li>
          {user.role == "admin" &&
            user.role ==
              "root"(
                <li className={isActive("/create")}>
                  <Link href="/create">create</Link>
                </li>
              )}

          {user ? (
            <>
              {" "}
              <li className={isActive("/account")}>
                <Link href="/account">Account</Link>
              </li>
              <button
                className="btn red"
                onClick={() => {
                  cookie.remove("token");
                  cookie.remove("user");
                  router.push("/login");
                }}
              >
                Logout
              </button>{" "}
            </>
          ) : (
            <>
              {" "}
              <li className={isActive("/login")}>
                <Link href="/login">Login</Link>
              </li>
              <li className={isActive("/signup")}>
                <Link href="/signup">sign up</Link>
              </li>{" "}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
