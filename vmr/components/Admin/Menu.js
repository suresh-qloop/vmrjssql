import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ROLES } from "../../utils/roles";
// import { loadTree } from "../../public/dist/js/loadTree.js";

const Menu = () => {
  const navigate = useRouter();
  const { status, data } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isSeo, setSeo] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isSalesTeam, setIsSalesTeam] = useState(false);

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
      if (role === ROLES.Manager) {
        setIsManager(true);
      }
      if (role === ROLES.SEO) {
        setSeo(true);
      }
      if (role === ROLES.Content) {
        setIsContent(true);
      }
      if (role === ROLES.SalesTeam) {
        setIsSalesTeam(true);
      }
    }
  };

  return (
    mounted && (
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
                <Link
                  href="/admin/dashboard"
                  className={`nav-link ${
                    navigate.pathname === "/admin/dashboard" ? "active" : ""
                  } `}
                >
                  <i className="nav-icon fas fa-tachometer-alt mr-2" />
                  <p>Dashboard</p>
                </Link>
              </li>

              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/users"
                    className={`nav-link ${
                      navigate.pathname === "/admin/users" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-users mr-2"></i>
                    <p>Manage Users</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/categories"
                    className={`nav-link ${
                      navigate.pathname === "/admin/categories" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-filter mr-2"></i>
                    <p>Categories</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/reports"
                    className={`nav-link ${
                      navigate.pathname === "/admin/reports" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-book mr-2"></i>
                    <p>Reports</p>
                  </Link>
                </li>
              )}
              {isSeo && (
                <li className="nav-item">
                  <Link
                    href="/admin/seo_reports"
                    className={`nav-link ${
                      navigate.pathname === "/admin/seo_reports" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-book mr-2"></i>
                    <p>Reports</p>
                  </Link>
                </li>
              )}

              {isContent && (
                <li className="nav-item">
                  <Link
                    href="/admin/content_reports"
                    className={`nav-link ${
                      navigate.pathname === "/admin/content_reports"
                        ? "active"
                        : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-book mr-2"></i>
                    <p>Reports</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/articles"
                    className={`nav-link ${
                      navigate.pathname === "/admin/articles" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-newspaper mr-2"></i>
                    <p>Articles</p>
                  </Link>
                </li>
              )}
              {isSeo && (
                <li className="nav-item">
                  <Link
                    href="/admin/seo_articles"
                    className={`nav-link ${
                      navigate.pathname === "/admin/seo_articles"
                        ? "active"
                        : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-newspaper mr-2"></i>
                    <p>Articles</p>
                  </Link>
                </li>
              )}
              {isContent && (
                <li className="nav-item">
                  <Link
                    href="/admin/content_articles"
                    className={`nav-link ${
                      navigate.pathname === "/admin/content_articles"
                        ? "active"
                        : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-newspaper mr-2"></i>
                    <p>Articles</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/testimonials"
                    className={`nav-link ${
                      navigate.pathname === "/admin/testimonials"
                        ? "active"
                        : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-quote-left mr-2"></i>
                    <p>Testimonials</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/clients"
                    className={`nav-link ${
                      navigate.pathname === "/admin/clients" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-user-friends mr-2"></i>
                    <p>Home Page Logos</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager || isSalesTeam) && (
                <li className="nav-item">
                  <Link
                    href="/admin/enquiries"
                    className={`nav-link ${
                      navigate.pathname === "/admin/enquiries" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-question mr-2"></i>
                    <p>Enquiries</p>
                  </Link>
                </li>
              )}
              {(isAdmin || isManager) && (
                <li className="nav-item">
                  <Link
                    href="/admin/settings"
                    className={`nav-link ${
                      navigate.pathname === "/admin/settings" ? "active" : ""
                    } `}
                  >
                    <i className="nav-icon fas fa-wrench mr-2"></i>
                    <p>Settings</p>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </aside>
    )
  );
};

export default Menu;
