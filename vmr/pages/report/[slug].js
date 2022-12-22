import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
import Breadcrumb from "../../components/Frontend/Breadcrumb";
import { useRouter } from "next/router";
import moment from "moment/moment";
import axios from "axios";
import { currencyFormat } from "../../components/utils/utils";
import Accordion from "react-bootstrap/Accordion";
import Head from "next/head";

const ReportDetails = ({ reportData }) => {
  // console.log(data, "context");
  // const [reportData, setReportData] = useState([]);
  // console.log(commentsFromServer, "commentsFromServer");

  // setReportData(data);
  const router = useRouter();
  // const { slug } = router.query;
  // console.log(slug);

  // const getReportData = async () => {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_NEXT_API}/report/${slug}`)
  //     .then((res) => {
  //       setReportData(res.data.report);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   if (!slug) {
  //     return;
  //   }
  //   getReportData();
  // }, [slug]);

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
      <Breadcrumb name="Industrial Equipment" />
      <div className=" bg-light py-3">
        <div className="container bg-white p-4">
          <div className="row">
            <div className="col-md-9 ">
              <div className="row">
                <div className="col-md-2">
                  <div className="img-box">
                    <img
                      className=" "
                      alt=""
                      src="https://www.valuemarketresearch.com/img/reports/report1.webp"
                      //   style={{ width: 500 }}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <p>
                    <strong>{reportData.product_name}</strong>
                  </p>
                  <div className="row ">
                    <div className="col-md-3">
                      <i className="far fa-calendar-alt mr-2"></i>
                      <span>
                        {moment(reportData.pub_date).format("YYYY-MM-DD ")}
                      </span>
                    </div>
                    <div className="col-md-9">
                      <span>
                        <strong> REPORT FORMATS:</strong> ELECTRONIC (PDF), MS
                        EXCEL
                      </span>
                    </div>

                    <Link
                      href={`/contact/download-sample/${reportData.slug}`}
                      className="btn btn-success btn-sm mr-3 mt-3"
                      style={{ width: 180 }}
                    >
                      <i className="fas fa-download"></i> Download Sample
                    </Link>

                    <Link
                      href={`/contact/ask-questions/${reportData.slug}`}
                      className="btn btn-info btn-sm mr-3  mt-3"
                      style={{ width: 150 }}
                    >
                      <i className="fas fa-question-circle"></i> Ask Questions
                    </Link>

                    <Link
                      href={`/contact/request-customization/${reportData.slug}`}
                      className="btn btn-warning text-light mr-3 btn-sm  mt-3"
                      style={{ width: 200 }}
                    >
                      <i className="fas fa-edit "></i> Request Customization
                    </Link>

                    <Link
                      href={`/contact/request-for-discount/${reportData.slug}`}
                      className="btn btn-primary btn-sm mr-3  mt-3"
                      style={{ width: 150 }}
                    >
                      <i className="fas fa-edit"></i> Request Discount
                    </Link>

                    <Link
                      href={`/contact/covid-19-impact/${reportData.slug}`}
                      className="btn btn-danger btn-sm mr-3  mt-3"
                      style={{ width: 150 }}
                    >
                      COVID-19 Impact
                    </Link>

                    <button
                      className="btn btn-primary btn-sm mr-3  mt-3"
                      onClick={() => router.back()}
                      style={{ width: 150 }}
                    >
                      back
                    </button>
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
                  {reportData.faqs?.length > 0 && (
                    <h4 className="my-4 text-secondary">
                      Frequently Asked Questions (FAQs) about this Report
                    </h4>
                  )}
                  {reportData.faqs?.map((faq, i) => (
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
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-header  text-center p-2">
                  <strong> Choose your Buying Option</strong>
                </div>
                <div className="card-body">
                  <ul
                    className="m-0 p-0 "
                    style={{ listStyle: "none", margin: 0 }}
                  >
                    <li>
                      <div className="icheck-primary d-inline">
                        <input
                          type="radio"
                          value=""
                          name="todo1"
                          id="todoCheck1"
                        />
                        <label htmlFor="todoCheck1" className="text-xs">
                          Single User License:&nbsp;
                          <span className="text-xs">
                            {reportData.price
                              ? currencyFormat(reportData.price)
                              : ""}
                          </span>
                        </label>
                      </div>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <div className="icheck-primary d-inline">
                        <input
                          type="radio"
                          value=""
                          name="todo1"
                          id="todoCheck2"
                        />
                        <label htmlFor="todoCheck2" className="text-xs">
                          Upto 10 Users License:&nbsp;
                          <span className="text-xs">
                            {reportData.upto10
                              ? currencyFormat(reportData.upto10)
                              : ""}
                          </span>
                        </label>
                      </div>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <div className="icheck-primary d-inline ">
                        <input
                          type="radio"
                          value=""
                          name="todo1"
                          id="todoCheck3"
                        />
                        <label htmlFor="todoCheck3" className="text-xs">
                          Corporate User License:&nbsp;
                          <span className="text-xs">
                            {reportData.corporate_price
                              ? currencyFormat(reportData.corporate_price)
                              : ""}
                          </span>
                        </label>
                      </div>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <div className="icheck-primary d-inline ">
                        <input
                          type="radio"
                          value=""
                          name="todo1"
                          id="todoCheck4"
                        />
                        <label htmlFor="todoCheck4" className="text-xs ">
                          DataPack License:&nbsp;
                          <span className="text-xs">
                            {reportData.data_pack_price
                              ? currencyFormat(reportData.data_pack_price)
                              : ""}
                          </span>
                        </label>
                      </div>
                    </li>
                    <hr className="mt-2 mb-0 dashed" />
                  </ul>
                  <Link
                    className="btn btn-success text-center mt-3  form-control"
                    href="/reports"
                  >
                    <i className="fas fa-shopping-basket"></i> Buy Now
                  </Link>
                </div>
              </div>
              <div className="card ">
                <div className="card-header  text-center p-2">
                  <strong> Buy Chapters or Sections</strong>
                </div>
                <div className="card-body">
                  <p className="m-0 pb-2  text-sm">
                    Avail customized purchase options to meet your exact
                    research needs:
                  </p>
                  <ul className="m-0 pl-3">
                    <li>
                      <span className=" text-sm">
                        Buy sections of this report
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Buy country level reports
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Request for historical data
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Request discounts available for Start-Ups & Universities
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                  </ul>
                  <Link
                    className="btn btn-primary text-center mt-2  from-control"
                    href="/report-details"
                  >
                    Request for Special Pricing
                  </Link>
                </div>
              </div>
              <div className="card ">
                <div className="card-header  text-center p-2">
                  <strong> Objectives of Study</strong>
                </div>
                <div className="card-body">
                  <ul className="m-0 pl-3">
                    <li>
                      <span className=" text-sm">
                        Define and measure the global market
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Volume or revenue forecast of the global market and its
                        various sub-segments with respect to main geographies
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Analyze and identify major market trends along with the
                        factors driving or inhibiting the market growth
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Study the company profiles of the major market players
                        with their market share
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <span className=" text-sm">
                        Analyze competitive developments
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                  </ul>
                </div>
              </div>
              <div className="card ">
                <div className="card-header  text-center p-2">
                  <strong> Why Choose Us</strong>
                </div>
                <div className="card-body">
                  <ul
                    className="m-0 p-0 text-left"
                    style={{ listStyle: "none", margin: 0 }}
                  >
                    <li>
                      <i className="fas fa-user mr-3"></i>
                      <span className=" text-sm">Client First Policy</span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="fas fa-certificate mr-3"></i>
                      <span className=" text-sm">Excellent Quality</span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="fas fa-handshake mr-3"></i>
                      <span className=" text-sm">After Sales Support</span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="far fa-envelope mr-3"></i>
                      <span className=" text-sm">24/7 Email Support</span>
                    </li>
                    <hr className="m-2 dashed" />
                  </ul>
                </div>
              </div>
              <div className="card ">
                <div className="card-header  text-center p-2">
                  <strong> Clients</strong>
                </div>
                <div className="card-body">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active client-logo">
                        <img
                          className="d-block w-100 "
                          src="	https://www.valuemarketresearch.com/img/client_images/Of7Q2kP.webp"
                          alt="First slide"
                        />
                      </div>
                      <div className="carousel-item client-logo">
                        <img
                          className="d-block w-100"
                          src="	https://www.valuemarketresearch.com/img/client_images/BmQ4EpG.webp"
                          alt="Second slide"
                        />
                      </div>
                      <div className="carousel-item client-logo">
                        <img
                          className="d-block w-100"
                          src="	https://www.valuemarketresearch.com/img/client_images/Tg9AOGE.webp"
                          alt="Third slide"
                        />
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-custom-icon"
                        aria-hidden="true"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-custom-icon"
                        aria-hidden="true"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card ">
                <div className="card-header  text-center p-2">
                  <strong> Testimonials</strong>
                </div>
                <div className="card-body" style={{ height: 380 }}>
                  <div
                    id="carouselExampleIndicators1"
                    className="carousel slide"
                    data-ride="carousel"
                  >
                    <div className="carousel-inner">
                      <div className="carousel-item active ">
                        <p>
                          <i className="fas fa-quote-left text-lg mr-3"></i>"
                          This is our second purchase and we have been obliged
                          by the service. We appreciate the efforts put by Value
                          Market Research in terms of understanding our needs,
                          expanding the scope of the study, delivery and
                          handling after sales queries. "
                        </p>
                        <hr className="m-2 dashed" />
                        <h5>
                          <i className="far fa-user-circle text-lg mr-3"></i>Jo
                          Chin, Owner of a Manufacturing Plant in Taiwan
                        </h5>
                      </div>
                      <div className="carousel-item ">
                        <p>
                          <i className="fas fa-quote-left text-lg mr-3"></i>"
                          Doing business with Value Market Research was – quick,
                          easy and accurate. We got what we expected. The team
                          was very helpful and processes were altered for our
                          convenience. The whole process from understanding our
                          niche requirements to delivery to after sales was
                          excellent. "
                        </p>
                        <hr className="m-2 dashed" />
                        <h5>
                          <i className="far fa-user-circle text-lg mr-3"></i>
                          Vincenzo Baydar – Head Planning, Leading Food Chain,
                          US
                        </h5>
                      </div>
                      <div className="carousel-item ">
                        <p>
                          <i className="fas fa-quote-left text-lg mr-3"></i>"
                          Excellent work!! Working with you has been easy and
                          direct. Your flexibility to alter the report scope and
                          timely delivery assisted me in delivering my project
                          proposal on time. "
                        </p>
                        <hr className="m-2 dashed" />
                        <h5>
                          <i className="far fa-user-circle text-lg mr-3"></i>Mia
                          Tang, Director - Business Strategy, Steel Industry,
                          Germany
                        </h5>
                      </div>
                    </div>
                    <a
                      className="carousel-control-prev"
                      href="#carouselExampleIndicators1"
                      role="button"
                      data-slide="prev"
                    >
                      <span
                        className="carousel-control-custom-icon"
                        aria-hidden="true"
                      >
                        <i className="fas fa-chevron-left"></i>
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      href="#carouselExampleIndicators1"
                      role="button"
                      data-slide="next"
                    >
                      <span
                        className="carousel-control-custom-icon"
                        aria-hidden="true"
                      >
                        <i className="fas fa-chevron-right"></i>
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="container my-5">
                <div className="row my-5">
                  <div className="col-md-2"></div>
                  <div className="col-md-8 ">
                    <div className="bg-success text-light py-3 border rounded text-center">
                      <Link
                        href={`/contact/download-sample/${reportData.slug}`}
                      >
                        <i className="fas fa-download text-lg mr-2"></i>Download
                        Sample
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                </div>
                <div className="row border p-2">
                  <div className="col-md-6">
                    <h5 className="text-center  mb-3">
                      KEY QUESTIONS ANSWERED BY THE REPORT
                    </h5>
                    <div className="border p-3 m-3">
                      <Link href="/" className="text-info">
                        What is the current market size and trends?
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        What will be the market size during the forecast period?
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        How various market factors such as a driver, restraints,
                        and opportunity impact the market?
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        What are the dominating segment and region in the market
                        and why?
                      </Link>
                      <hr className="m-2 dashed" />

                      <button className="btn btn-primary my-2  form-control">
                        Request Free Sample Report
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="text-center mb-3">
                      NEED SPECIFIC MARKET INFORMATION?
                    </h5>
                    <div className="border p-3 m-3">
                      <Link href="/" className="text-info">
                        <i className="fas fa-user text-lg mr-2"></i> What is the
                        current market size and trends?
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        <i className="fas fa-users text-lg mr-2"></i> Share your
                        specific research requirments for a customized report
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        <i className="fas fa-share-alt text-lg mr-2"></i>
                        Request for due diligence and consumer centric studies
                      </Link>
                      <hr className="m-2 dashed" />
                      <Link href="/" className="text-info">
                        <i className="fas fa-recycle text-lg mr-2"></i>
                        Request for study updates, segment specific and country
                        level reports
                      </Link>
                      <hr className="m-2 dashed" />

                      <button className="btn btn-primary my-2  form-control">
                        Request For Customization
                      </button>
                    </div>
                  </div>
                </div>
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
  // console.log(query);
  const res = await axios(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/report/${query.slug}`
  );
  const json = res.data;
  return { reportData: json };
};
