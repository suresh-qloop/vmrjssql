import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";

import NavbarTop from "../components/Frontend/NavbarTop";

import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Link from "next/link";

export default function HowToOrder() {
  return (
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
                  Credit Card/PayPal - Payment link is accessible on each report
                  page.We accept payment via Master Card/ VISA/ American Express
                  We can send payment links via e-mail also.
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
            After we receive the order we can deliver the electronic copy of the
            report (PDF) within 24 to 48 working hours. In case of customised
            reports delivery time may vary.
          </p>

          <hr className="m-2 dashed" />
        </div>
      </section>

      <BackTop />
      <Footer />
    </div>
  );
}
