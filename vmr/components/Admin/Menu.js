import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Menu = () => {
  const { status, data } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const ROLES = {
    SuperAdmin: 1,
    Analyst: 2,
    SEO: 2,
    Content: 2,
    JrAnalyst: 2,
    User: 2,
    SalesTeam: 2,
  };
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setRole();
    // eslint-disable-next-line
  }, [status]);

  const setRole = () => {
    if (status === "authenticated") {
      const role = data.user.role;
      if (role === ROLES.SuperAdmin) {
        setIsAdmin(true);
      }
    }
  };

  return (
    mounted && (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <Link href="/admin/dashboard" className="brand-link">
            <h3 className="brand-text text-center font-weight-light">
              VMR Admin
            </h3>
          </Link>
          {/* Sidebar */}
          <div className="sidebar">
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link href="/admin/dashboard" className="nav-link  ">
                    <i className="nav-icon fas fa-tachometer-alt mr-2" />
                    <p>Dashboard</p>
                  </Link>
                </li>

                {isAdmin && (
                  <li className="nav-item">
                    <Link href="/admin/users" className="nav-link">
                      <i className="nav-icon fas fa-users mr-2"></i>
                      <p>Manage Users</p>
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li className="nav-item">
                    <Link href="/admin/categories" className="nav-link">
                      <i className="nav-icon fas fa-filter mr-2"></i>
                      <p>Categories</p>
                    </Link>
                  </li>
                )}
                {isAdmin && (
                  <li className="nav-item">
                    <Link href="/admin/reports" className="nav-link">
                      <i className="nav-icon fas fa-book mr-2"></i>
                      <p>Reports</p>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    )
  );
};

export default Menu;
