import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import NavbarTop from "../components/Frontend/NavbarTop";
import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Disclaimer" />
      <section className="bg-light">
        <div className="container py-4">
          <h5 className="text-left">DISCLAIMER</h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            Value Market Research is not responsible for any inaccurate
            information provided in our reports. As this information is
            collected based on interviews fluctuations and diversion of data is
            possible, though we ensure regular checks and data validation
            through secondary sources.
          </p>

          <p className="text-secondary pb-3">
            Reports and data purchased through us is for personal or company use
            only. Buyer is not authorized to disclose our data analysis to third
            party or any other publications.
          </p>

          <p className="text-secondary pb-3">
            Disclosing, lending, circulating, reselling, recording,
            photocopying, mechanical/electronically reproduction of any table/
            section/ chapter of the Value Market Research report or services
            without written permission are prohibited.
          </p>
          <p className="text-secondary pb-3">
            Decisions made by the clients based on the report analysis are
            solely their own responsibility. Value Market Research holds no
            liability for those decisions.
          </p>
          <p className="text-secondary pb-3">
            For permissions or any other query please contact us at
            <Link href="mailto:sales@valuemarketresearch.com " className="ml-1">
              sales@valuemarketresearch.com.
            </Link>
          </p>

          <hr className="m-2 dashed" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
