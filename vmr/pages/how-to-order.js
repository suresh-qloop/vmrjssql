import React, { useEffect } from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";

import NavbarTop from "../components/Frontend/NavbarTop";

import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Link from "next/link";
import Head from "next/head";

export default function HowToOrder() {
  useEffect(() => {
    var d = document;
    var x = !d.getElementById("razorpay-embed-btn-js");
    if (d) {
      var s = d.createElement("script");
      s.defer = !0;
      s.id = "razorpay-embed-btn-js";
      s.src = "https://cdn.razorpay.com/static/embed_btn/bundle.js";
      d.body.appendChild(s);
    } else {
      var rzp = window["_rzp_"];
      rzp && rzp.init && rzp.init();
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dist/img/favicon.ico"
        />
        <meta
          name="keywords"
          content="Buy Market Research Reports, Order Market research Reports, Buy VMR Reports"
        />
        <meta
          name="description"
          content="Buying from Value Market Research for the first time! Please follow the below instructions."
        ></meta>

        <title>How to Order - Value Market Research</title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        <Navbar />
        <Breadcrumb name="How to Order" />
        <section className="bg-light">
          <div className="container py-4">
            <h5 className="text-left">HOW TO ORDER</h5>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-3">
              At Value Market Research we accept orders through website and
              e-mails sent to{" "}
              <Link href="mailto:sales@valuemarketresearch.com">
                sales@valuemarketresearch.com
              </Link>
            </p>

            <p className="text-secondary pb-3">
              Each report page is equipped with a buy now link. Buyer has the
              option of making the payment via following options -
            </p>

            <ul className="text-dark">
              <li>
                <p>
                  <strong>
                    Credit Card/PayPal - Payment link is accessible on each
                    report page.We accept payment via Master Card/ VISA/
                    American Express We can send payment links via e-mail also.
                  </strong>
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Wire Transfer/Against Invoice - We accept payment against
                    invoice also. Please drop a mail to
                    sales@valuemarketresearch.com and we will share the invoice
                    with our Bank Details.
                  </strong>
                </p>
              </li>
            </ul>

            <p className="text-secondary pb-3">
              After we receive the order we can deliver the electronic copy of
              the report (PDF) within 24 to 48 working hours. In case of
              customised reports delivery time may vary.
            </p>

            <hr className="m-2 dashed" />
            <div
              className="razorpay-embed-btn text-center"
              data-url="https://pages.razorpay.com/vmrpayment"
              data-text="Make Payment"
              data-color="#528FF0"
              data-size="large"
            ></div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
