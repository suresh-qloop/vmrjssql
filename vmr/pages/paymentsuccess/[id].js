import React, { Fragment } from "react";

import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
import { useRouter } from "next/router";

//

const PaymentSuccess = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Fragment>
      <NavbarTop />
      <Navbar />

      <div className=" bg-light py-3">
        <div className="container  p-5 success">
          <div className="row p-5 ">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <h1>Congratulations ! Your payment is successful.</h1>
              <p className="mt-3 ">
                Thanks for placing an order with valuemarketresearch.com .Our
                team will get in touch with you shortly and take this forward.
                Alternatively, you could mail us at
                sales@valuemarketresearch.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <Footer />
    </Fragment>
  );
};

export default PaymentSuccess;
