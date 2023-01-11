import React, { useState, useEffect } from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import Latest from "../components/Frontend/Home/Latest";
import NavbarTop from "../components/Frontend/NavbarTop";
import Client from "../components/Frontend/Home/Client";
import Navbar from "../components/Frontend/Navbar";
import axios from "axios";

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
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <section className="bg-light">
        <div className="container py-5">
          <div className="heading">
            <h3 className="text-center">Oue Testimonials.</h3>
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
                    <h5>
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
            <h3 className="text-center">Oue Clients.</h3>
          </div>

          <Client />
        </div>
      </section>
      <Latest />
      <BackTop />
      <Footer />
    </div>
  );
}
