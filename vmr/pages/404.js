import React, { Fragment } from "react";

import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
import Link from "next/link";

const NotFound = () => {
  return (
    <Fragment>
      <NavbarTop />
      <Navbar />

      <div className=" bg-light py-3">
        <div className="container  p-5 danger">
          <div className="row p-5 ">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <h1>Ooopss...</h1>
              <p className="mt-3">
                It seems the content that you are looking for is missing. We
                request you to visit any of below links and resume browsing :
              </p>
              <Link href="/" className="btn btn-light">
                <i className="fas fa-arrow-left mr-2"></i>Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default NotFound;
