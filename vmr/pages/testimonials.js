import React, { useState, useEffect } from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";

import NavbarTop from "../components/Frontend/NavbarTop";
import Client from "../components/Frontend/Home/Client";
import Navbar from "../components/Frontend/Navbar";
import axios from "axios";
import Head from "next/head";

export default function Testimonials() {
  const [testimonialList, setTestimonialList] = useState([]);
  useEffect(() => {
    getReportList();
    // eslint-disable-next-line
  }, []);

  const getReportList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/testimonials`)
      .then((res) => {
        setTestimonialList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          content="Testimonials, VMR Reports, Industry Reports"
        />
        <meta
          name="description"
          content="Read what our esteemed clients have to say about us."
        ></meta>

        <title>Testimonials - Value Market Research</title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        <Navbar />
        <section className="bg-light">
          <div className="container py-5">
            <div className="heading">
              <h3 className="text-center">Clients Testimonials.</h3>
            </div>
            <div className="row justify-content-center">
              {testimonialList?.map((article, i) => (
                <div className="col-md-6 mb-4 p-3" key={i + 1}>
                  <div key={i + 1} className="">
                    <div className="d-block ">
                      <p>
                        <i className="fas fa-quote-left text-lg mr-3"></i>"
                        {article.testimonial_description}"
                      </p>
                      <hr className="m-2 dashed" />
                      <h5 className="text-blue">
                        <i className="far fa-user-circle text-lg mr-3"></i>
                        {article.testimonial_title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="container py-5">
            <div className="heading">
              <h3 className="text-center">Our Clients.</h3>
            </div>

            <Client />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
