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
      <Breadcrumb name="Career" />
      <section className="bg-light">
        <div className="container py-4">
          <h2 className="text-center pb-3   ">Come Grow With Us!!!</h2>

          <p className="text-secondary pb-3 text-center">
            We at Value Market Research respect commitment and passion. High
            commitment showcases the enthusiasm one has towards work, and an
            enthusiastic employee is a treasure to any company. Passion gives an
            extra push to accomplish difficult tasks, tasks which require more
            thinking, more effort..
          </p>

          <p className="text-secondary pb-3 text-center">
            Thus a team of committed and passionate employees is{" "}
            <strong> What We Are Today!!!</strong>
          </p>
          <h3 className="text-center pb-2">Job Opening</h3>
          <hr className="m-2 dashed pb-3" />
          <div className="row text-center">
            <div className="col-md-4">
              <div className="alert alert-success">
                Market Research Internship
              </div>
            </div>
            <div className="col-md-4">
              <div className="alert alert-success">
                Market Research Executive
              </div>
            </div>
            <div className="col-md-4">
              <div className="alert alert-success">
                Technology Assistant (Freelancer)
              </div>
            </div>
          </div>
          <p className="text-secondary py-3">
            <strong>
              Share your CV with us at
              <Link
                href="mailto:sales@valuemarketresearch.com "
                className="ml-1"
              >
                hr@valuemarketresearch.com
              </Link>
            </strong>
          </p>

          <hr className="m-2 dashed" />
        </div>
      </section>

      <BackTop />
      <Footer />
    </div>
  );
}
