import React, { Fragment } from "react";

import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";

const PaymentFailed = () => {
  return (
    <Fragment>
      <NavbarTop />
      <Navbar />

      <div className=" bg-light py-3">
        <div className="container  p-5 danger">
          <div className="row p-5 ">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <h1>Sorry ! Your payment is failed.</h1>
              <p className="mt-3 ">
                Our team will get in touch with you shortly and take this
                forward. Alternatively, you could mail us at
                sales@valuemarketresearch.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default PaymentFailed;
