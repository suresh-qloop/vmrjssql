import React, { Fragment } from "react";

import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
import Breadcrumb from "../../components/Frontend/Breadcrumb";

import moment from "moment/moment";
import axios from "axios";

import Head from "next/head";
import WhyChooseUs from "../../components/Frontend/SideBar/WhyChooseUs";
import Clients from "../../components/Frontend/SideBar/Clients";
import Testimonials from "../../components/Frontend/SideBar/Testimonials";

import Objectives from "../../components/Frontend/SideBar/Objectives";
import Link from "next/link";
import BackTop from "../../components/common/BackTop";

const AnalysisDetails = ({ articleData }) => {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content={articleData.meta_keywords} />
        <meta name="description" content={articleData.meta_desc}></meta>

        <title>{articleData.meta_title}</title>
      </Head>
      <NavbarTop />
      <Navbar />
      {/* <Breadcrumb name={articleData.headline} /> */}
      <div className=" py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 d-flex">
              <Link href="/" className="text-dark">
                Home
              </Link>
              &nbsp; <span>/</span> &nbsp;
              <Link href="/analysis" className="text-dark">
                Analysis
              </Link>
              &nbsp;<span>/</span> &nbsp;
              <span>{articleData.headline}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-3">
        <div className="container bg-white p-4">
          <div className="row">
            <div className="col-md-9 ">
              <h4 className="text-blue">{articleData.headline}</h4>
              <div className="row">
                <div className="col-md-12 mt-3">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Posted On: &nbsp;
                  <span>
                    {moment(articleData.pub_date).format("YYYY-MM-DD ")}
                  </span>
                  <Link
                    href={`/contact/covid-19-impact/${articleData.id}`}
                    className="btn btn-danger btn-sm ms-5  "
                    style={{ width: 150 }}
                  >
                    COVID-19 Impact
                  </Link>
                </div>
                <div className="col-md-12">
                  <div className="row mt-4 p-2 border">
                    <h4 className="mt-3">Description</h4>
                    <div className="tab-content p-3" id="nav-tabContent">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: articleData.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <WhyChooseUs />
              <Objectives />
              <Clients />
              <Testimonials />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default AnalysisDetails;

AnalysisDetails.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const res = await axios(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/analysis/${query.slug}`
  );
  const json = res.data;
  return { articleData: json };
};
