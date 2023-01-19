import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import NavbarTop from "../components/Frontend/NavbarTop";
import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";

export default function Privacy() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="FAQ" />
      <section className="bg-light">
        <div className="container py-4">
          <h4 className="text-left">FAQ</h4>
          <div className="border p-3 my-3">
            <h5 className="text-left mb-4">
              Order and Delivery Related Queries
            </h5>
            <p className="text-secondary">
              <strong> Q.1 : How can I purchase the report?</strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-4">
              Value Market Research knows that you care how information about
              you is used and shared, and we appreciate your trust that we will
              do so carefully and sensibly. This notice describes our privacy
              policy. By visiting https://www.valuemarketresearch.com, you are
              accepting the practices described in this Privacy Notice.
            </p>

            <p className="text-secondary">
              <strong> Q.2 : How do I receive the report?</strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-4">
              A : After receiving the payment we deliver the report within 24
              -48 working hours. The report is delivered as a PDF through
              e-mail. We can also send the hard copy of the report at additional
              charges.
            </p>

            <p className="text-secondary">
              <strong> Q.3 : How can I order the report?</strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-1">
              A : You can order the report by - buying directly from the site
              using the BUY NOW Option Or connect with our sales team
              (sales@valuemarketresearch.com) who will assist you in the same.
            </p>
          </div>
          <div className="border p-3 my-3">
            <h5 className="text-left mb-4">
              you in the same. Licenses and Purchase Related Queries
            </h5>
            <p className="text-secondary">
              <strong>
                Q.1 : What are the types of License options available for me?
              </strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-4">
              A : You can opt for any of the below Licenses as per your
              requirement - Single User License - Single User License allows
              only one user to access the Report. The report will be sent
              electronically to the buyer as a PDF File. Multi-User License -
              Multi-User License allows 2-10 users to access the Report. The
              report will be sent electronically to the buyers as a PDF File.
              Enterprise User License - Enterprise User License allows access of
              the Report across the whole enterprise. The report will be sent
              electronically as a PDF File. Data Pack - This covers all data
              tables of the report in the excel format only.
            </p>

            <p className="text-secondary">
              <strong>
                Q.2 : Can I purchase a specific chapter/ specific region or
                specific table from your market research reports?
              </strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-1">
              A : Yes, we can provide you specific chapters / specific regions
              and/or specific tables as per your research requirements. You just
              need to drop us a mail at sales@valuemarketresearch.com specifying
              your requirements and we will assist you with your customized
              requirement.
            </p>
          </div>
          <div className="border p-3 my-3">
            <h5 className="text-left mb-4">Payment related Queries</h5>
            <p className="text-secondary">
              <strong> Q.1 : How can I make the payment?</strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-4">
              A : We accept Credit Card payment, PayPal and Wire Transfer. You
              can get the details for the payment by dropping us a mail on
              sales@valuemarketresearch.com
            </p>

            <p className="text-secondary">
              <strong> Q.2 : What are your Terms of Payment?</strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-4">
              A : We work on advance payment terms. As our product is a digital
              commodity, it is considered to be consumed the moment it is
              delivered. We follow a NO REFUND policy. It is therefore suggested
              to review the samples and mentioned TOC of the report thoroughly
              before purchasing the report.
            </p>

            <p className="text-secondary">
              <strong>
                Q.3 : I am unable to make the payment. What to do?
              </strong>
            </p>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-1">
              A : At times you may face issues like ‘Payment Decline’ and
              ‘Payment Gateway Failure ‘while making the payment. It might be
              due to Mismatch of billing address and payment information
              (Recheck the information shared) Credit limit issues (You may need
              to contact your bank to increase the credit limit) Transaction
              blocked by your card issuing bank (You may need to contact your
              bank to get the transaction approved) In case of any other payment
              related issues, please get in touch with us at:
              sales@valuemarketresearch.com
            </p>
          </div>
        </div>
      </section>

      <BackTop />
      <Footer />
    </div>
  );
}
