import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
// import Breadcrumb from "../../components/Frontend/Breadcrumb";
// import { useRouter } from "next/router";
import moment from "moment/moment";
import axios from "axios";
// import { currencyInrFormat } from "../../utils/utils";
import { currencyInrFormat } from "../../utils/currencyInrFormat";
// import Accordion from "react-bootstrap/Accordion";
import Head from "next/head";
import WhyChooseUs from "../../components/Frontend/SideBar/WhyChooseUs";
import Clients from "../../components/Frontend/SideBar/Clients";
import Testimonials from "../../components/Frontend/SideBar/Testimonials";
import ChaptersInfo from "../../components/Frontend/SideBar/ChaptersInfo";
import Objectives from "../../components/Frontend/SideBar/Objectives";
import KeyQuestion from "../../components/Frontend/Report/KeyQuestion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { urlString } from "../../utils/urlString";

const ReportDetails = ({ reportData }) => {
  // const [singleUser, setSingleUser] = useState(true);
  // const [upTo10User, setUpTo10User] = useState(false);
  // const [corporateUser, setCorporateUser] = useState(false);
  // const [datapack, setDatapack] = useState(false);
  const [price, setPrice] = useState(reportData.price);
  useEffect(() => {
    sessionStorage.setItem("price", price);
  }, [price]);

  let output;
  if (reportData.product_faq) {
    const obj = JSON.parse(reportData.product_faq);

    if (obj) {
      output = Object.entries(obj).map(([question, answer]) => ({
        question,
        answer,
      }));
    }
  }
  const renderTooltip = (title) => (
    <Tooltip id="button-tooltip" {...title}>
      {title}
    </Tooltip>
  );
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content={reportData.meta_keywords} />
        <meta name="description" content={reportData.meta_desc}></meta>

        <title>{reportData.meta_name}</title>
      </Head>
      <NavbarTop />
      <Navbar />
      {/* <Breadcrumb name={reportData.category_name} /> */}
      <div className=" py-3 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 d-flex">
              <Link href="/" className="text-dark">
                Home
              </Link>
              &nbsp;
              <span>/</span> &nbsp;
              <span>
                <Link
                  href={`/industries/${
                    reportData.category_name
                      ? urlString(reportData.category_name)
                      : ""
                  }`}
                  className="text-dark"
                >
                  {reportData.category_name}
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-light pb-4">
        <div className="container bg-white p-4">
          <div className="row">
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-md-2">
                  <div className="img-box">
                    <img
                      alt=""
                      src="/dist/img/reports/report1.jpg"
                      //   style={{ width: 500 }}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <p className="text-blue">
                    <strong>{reportData.product_name}</strong>
                  </p>
                  <div className="row text-left">
                    <div className="col-md-3  ">
                      <i className="far fa-calendar-alt mr-2"></i>
                      <span className="report-span">
                        ID:{reportData.product_no}
                      </span>
                    </div>
                    <div className="col-md-3  ">
                      <i className="far fa-calendar-alt mr-2"></i>
                      <span className="report-span">
                        {moment(reportData.pub_date).format("MMMM YYYY")}
                      </span>
                    </div>
                    <div className="col-md-6 ">
                      <span className="report-span">
                        REPORT FORMATS: ELECTRONIC (PDF), MS EXCEL
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-md-6 ">
                      <Link
                        href={`/contact/${reportData.slug}/download-sample`}
                        className="btn  btn-purple  btn-sm mr-3 mt-3 btn-block"
                        target="_blank"
                        // style={{ width: 200 }}
                      >
                        <i className="fas fa-download"></i> Download Sample
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <Link
                        href={`/contact/${reportData.slug}/ask-questions`}
                        className="btn btn-info btn-sm mr-3  mt-3 btn-block"
                        target="_blank"
                        // style={{ width: 200 }}
                      >
                        <i className="fas fa-question-circle"></i> Ask Questions
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <Link
                        href={`/contact/${reportData.slug}/request-customization`}
                        className="btn btn-yellow  mr-3 btn-sm  mt-3 btn-block"
                        target="_blank"
                        // style={{ width: 200 }}
                      >
                        <i className="fas fa-edit "></i> Request Customization
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <Link
                        href={`/contact/${reportData.slug}/request-for-discount`}
                        className="btn btn-success btn-sm mr-3  mt-3 btn-block"
                        target="_blank"
                        // style={{ width: 200 }}
                      >
                        <i className="fas fa-edit"></i> Request Discount
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <Link
                        href={`/contact/${reportData.slug}/covid-19-impact`}
                        className="btn btn-red btn-sm mr-3  mt-3 btn-block"
                        target="_blank"
                        // style={{ width: 200 }}
                      >
                        COVID-19 Impact
                      </Link>
                    </div>
                    {/* <div className="col-md-3"></div> */}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row mt-4 p-2 border">
                    <nav className="w-100">
                      <div
                        className="nav nav-tabs bg-light"
                        id="product-tab"
                        role="tablist"
                      >
                        <a
                          className="nav-item nav-link active"
                          id="product-desc-tab"
                          data-toggle="tab"
                          href="#product-desc"
                          role="tab"
                          aria-controls="product-desc"
                          aria-selected="false"
                        >
                          Description
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="product-comments-tab"
                          data-toggle="tab"
                          href="#product-comments"
                          role="tab"
                          aria-controls="product-comments"
                          aria-selected="false"
                        >
                          Table Of Content
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content p-3" id="nav-tabContent">
                      <div
                        className="tab-pane fade active show"
                        id="product-desc"
                        role="tabpanel"
                        aria-labelledby="product-desc-tab"
                        dangerouslySetInnerHTML={{
                          __html: reportData.product_description,
                        }}
                      ></div>
                      <div
                        className="tab-pane fade"
                        id="product-comments"
                        role="tabpanel"
                        aria-labelledby="product-comments-tab"
                        dangerouslySetInnerHTML={{
                          __html: reportData.product_specification,
                        }}
                      ></div>
                    </div>
                  </div>
                  {output?.length > 0 && (
                    <h5 className="my-4 text-secondary">
                      Frequently Asked Questions (FAQs) about this Report
                    </h5>
                  )}
                  {/* {output?.map((faq, i) => (
                    <Accordion
                      key={i + 1}
                      defaultActiveKey="0"
                      className="my-3 shadow-sm rounded"
                    >
                      <Accordion.Item eventKey={i}>
                        <Accordion.Header className="text-info">
                          {faq.question}
                        </Accordion.Header>
                        <Accordion.Body className="card-body">
                          {faq.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))} */}
                  {output?.map((faq, i) => (
                    <div id="accordion">
                      <div className="card">
                        <div className="card-header" id={`heading${i + 1}`}>
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link text-blue"
                              data-toggle="collapse"
                              data-target={`#collapse${i + 1}`}
                              aria-expanded="true"
                              aria-controls={`collapse${i + 1}`}
                            >
                              {faq.question}
                            </button>
                          </h5>
                        </div>

                        <div
                          id={`collapse${i + 1}`}
                          className={`collapse ${i + 1 == 1 ? "show" : ""}`}
                          aria-labelledby={`heading${i + 1}`}
                          data-parent="#accordion"
                        >
                          <div className="card-body">{faq.answer}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="card">
                <div className="card-header  text-center p-2 blue-background text-light">
                  <strong>Choose your Buying Option</strong>
                </div>
                <div className="card-body">
                  <ul
                    className="m-0 p-0 "
                    style={{ listStyle: "none", margin: 0 }}
                  >
                    <li>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(
                          "Single User License allows only one user to access the Report.The report will be sent electronically to the buyer as a PDF File."
                        )}
                      >
                        <div className="icheck-primary">
                          <input
                            type="radio"
                            value={reportData.price}
                            name="price"
                            id="single"
                            onChange={(e) => {
                              setPrice(reportData.price);
                            }}
                            defaultChecked={true}
                          />
                          <label htmlFor="single" className="text-xs">
                            Single User License:&nbsp;
                            <span className="text-xs">
                              {reportData.price
                                ? currencyInrFormat(reportData.price)
                                : ""}
                            </span>
                          </label>
                        </div>
                      </OverlayTrigger>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(
                          "Multi-User License allows 2-10 users to access the Report.The report will be sent electronically to the buyers as a PDF File."
                        )}
                      >
                        <div className="icheck-primary">
                          <input
                            type="radio"
                            value={reportData.upto10}
                            name="price"
                            id="upto10"
                            onChange={(e) => {
                              setPrice(reportData.upto10);
                            }}
                          />
                          <label htmlFor="upto10" className="text-xs">
                            Upto 10 Users License:&nbsp;
                            <span className="text-xs">
                              {reportData.upto10
                                ? currencyInrFormat(reportData.upto10)
                                : ""}
                            </span>
                          </label>
                        </div>
                      </OverlayTrigger>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(
                          "Enterprise User License allows access of the Report across the whole enterprise. The report will be sent electronically as a PDF File."
                        )}
                      >
                        <div className="icheck-primary">
                          <input
                            type="radio"
                            value={reportData.corporate_price}
                            name="price"
                            id="corporate_price"
                            onChange={(e) => {
                              setPrice(reportData.corporate_price);
                            }}
                          />
                          <label htmlFor="corporate_price" className="text-xs">
                            Corporate User License:&nbsp;
                            <span className="text-xs">
                              {reportData.corporate_price
                                ? currencyInrFormat(reportData.corporate_price)
                                : ""}
                            </span>
                          </label>
                        </div>
                      </OverlayTrigger>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip(
                          "This covers all data tables of the report in the excel format only."
                        )}
                      >
                        <div className="icheck-primary">
                          <input
                            type="radio"
                            value={reportData.data_pack_price}
                            name="price"
                            id="data_pack_price"
                            onChange={(e) => {
                              setPrice(reportData.data_pack_price);
                            }}
                          />
                          <label htmlFor="data_pack_price" className="text-xs ">
                            DataPack License:&nbsp;
                            <span className="text-xs">
                              {reportData.data_pack_price
                                ? currencyInrFormat(reportData.data_pack_price)
                                : ""}
                            </span>
                          </label>
                        </div>
                      </OverlayTrigger>
                    </li>
                    <hr className="mt-2 mb-0 dashed" />
                  </ul>
                  <Link
                    className="btn btn-red text-center mt-3  form-control"
                    href={{
                      pathname: `/contact/${reportData.slug}/buy-now`,
                    }}
                  >
                    <i className="fas fa-shopping-basket"></i> Buy Now
                  </Link>
                </div>
              </div>
              <ChaptersInfo slug={reportData.slug} />
              <Objectives />
              <WhyChooseUs />
              <Clients />
              <Testimonials />
            </div>
            <div className="col-md-12">
              <div className="container my-5">
                <div className="row my-5">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 ">
                    {/* <div className="bg-success text-light py-3 border rounded text-center"> */}
                    <Link
                      href={`/contact/${reportData.slug}/download-sample`}
                      className="btn btn-red btn-block py-2 text-center"
                    >
                      <i className="fas fa-download text-lg mr-2"></i>Download
                      Sample
                    </Link>
                    {/* </div> */}
                  </div>
                  <div className="col-md-2"></div>
                </div>
                <KeyQuestion slug={reportData.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default ReportDetails;

ReportDetails.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const res = await axios(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/report/${query.slug}`
  );
  const json = res.data;
  return { reportData: json };
};
