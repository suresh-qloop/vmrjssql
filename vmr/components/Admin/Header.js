import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const navigate = useRouter();

  return (
    mounted && (
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a href="# " className="nav-link" data-toggle="dropdown">
              <img
                src="/dist/img/user1-128x128.jpg"
                alt="User Avatar"
                className=" mr-3 img-circle"
                style={{ height: 30, width: 30 }}
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-right "
              style={{ left: "inherit", right: 0 }}
            >
              <div className="dropdown-divider"></div>

              <Link
                href="/admin/users/change-password"
                className="dropdown-item"
              >
                <i className="fas fa-envelope mr-2"></i> Change Password
              </Link>

              <div className="dropdown-divider"></div>
              <button
                onClick={() => {
                  signOut({
                    redirect: false,
                  });
                  navigate.push("/");
                }}
                className="dropdown-item"
                // href="/"
              >
                <div className="pe-auto">
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </div>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Header;
