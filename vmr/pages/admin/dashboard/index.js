import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import Badges from "../../../components/Admin/Dashboard/Badges";
import { ROLES } from "../../../utils/roles";

const DashBoard = () => {
  const { status, data } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
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
      if (role === ROLES.SalesTeam) {
        setIsSalesTeam(true);
      }
    }
  };
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>

              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            {(isAdmin || isManager || isSalesTeam) && <Badges />}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
