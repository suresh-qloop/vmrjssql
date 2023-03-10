import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import Latest from "../components/Frontend/Home/Latest";
import NavbarTop from "../components/Frontend/NavbarTop";
import Client from "../components/Frontend/Home/Client";
import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Head from "next/head";

export default function Refund() {
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
          content="Refund policy, Market Research Reports, Industry Analysis, Customized Reports, VMR Reports, Value Market Research"
        />
        <meta
          name="description"
          content="The below mentioned Refund policy is applicable to all the products - Market Research Reports, Industry Analysis, Customized Reports sold through our site - www.valuemarketresearch.com"
        ></meta>

        <title>Refund Policy - Value Market Research</title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        <Navbar />
        <Breadcrumb name="Refund Policy" />
        <section className="bg-light">
          <div className="container py-4">
            <h5 className="text-left">REFUND POLICY</h5>
            <hr className="m-2 dashed" />

            <p className="text-secondary pb-3">
              As all products on Value Market Research are digital in nature,
              we, therefore, do not reimburse, refund, or cancel the orders once
              placed. Clients are requested to thoroughly go through the table
              of contents and understand the product specification before
              placing the orders. order.
            </p>

            <p className="text-secondary pb-3">
              We at Value Market Research do ensure an active after-sales query
              resolution but do not entertain refund requests. Value Market
              Research holds the sole right to validate a refund request and
              award the buyer with equivalent credit points, which can be
              consumed within a year. Value Market Research cannot be held
              legally liable for any chargeback or fees related to the
              transaction.
            </p>

            <hr className="m-2 dashed" />
            <br />
            <br />
            <br />
            <br />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
