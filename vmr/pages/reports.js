import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
// import { currencyInrFormat } from "../utils/currencyInrFormat";
import moment from "moment/moment";
import { Fragment } from "react";

// import { useRouter } from "next/router";
import { urlString } from "../utils/urlString";
import Head from "next/head";
//
// import { useSession } from "next-auth/react";

const Reports = ({ data }) => {
  // const router = useRouter();
  const [categoryList, setCategoryList] = useState(data.catData);

  const [reportList, setReportList] = useState(data.reportsData);
  const [count, setCount] = useState(data.count);
  const [hasMore, setHasMore] = useState(true);

  // const [categoryId, setCategoryId] = useState();

  // useEffect(() => {
  // getReportList();
  // getCategoryList();
  // eslint-disable-next-line
  // }, []);
  // useEffect(() => {
  //   setHasMore(count > reportList.length ? true : false);
  // }, [reportList]);

  // const getCategoryList = async () => {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/categories`)
  //     .then((res) => {
  //       setCategoryList(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getReportList = async () => {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/reports?start=0&limit=10`)
  //     .then((res) => {
  //       setReportList(res.data.reports);
  //       setCount(res.data.count);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getMoreReport = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/reports?start=${reportList.length}&limit=10`
      )
      .then((res) => {
        const reports = res.data.reports;
        setReportList((reportList) => [...reportList, ...reports]);
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
          content="Market Research Reports, Top Market Research Reports, Trending Market Research Reports, Browse Research Reports, Industrial Research Reports, VMR Reports, Best Market Research Reports"
        />
        <meta
          name="description"
          content="Browse our list of trending market research reports from 16+ top global industries. Get accurate and precise data at the best value."
        ></meta>

        <title>Market Research Reports - Top and Trending</title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        {/* <Navbar onSubmit={getData} searchName={setData} allCount={getCount} /> */}
        <Navbar />
        <Breadcrumb name="Reports" />
        <div className=" bg-light pb-5 pt-2">
          <div className="container bg-white pb-5 ">
            <div className="row">
              <div className=" col-lg-12 col-md-12 col-sm-12 bg-light">
                <h4>REPORTS</h4>
                <p className="">
                  Here is the database of all the market research reports we
                  have published. The description of each report covers a
                  complete table of contents along with the segmentation and
                  profiles of the market players.
                </p>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="card shadow-none mb-0">
                  <div className="card-header">
                    <h2 className="card-title">Reports by Industry </h2>
                  </div>

                  <div className="card-body p-0 m-0">
                    <div id="accordion">
                      {categoryList?.map((curElem, i) => (
                        <Fragment key={i + 1}>
                          <div id={`heading-${i}`}>
                            {curElem.children.length > 0 ? (
                              <i
                                role="button"
                                data-toggle="collapse"
                                href={`#collapse-${i}`}
                                aria-expanded="true"
                                aria-controls="collapse-1"
                                className="far fa-plus-square text-info "
                              ></i>
                            ) : (
                              <i className="far fa-minus-square text-info "></i>
                            )}

                            <Link
                              href={`industries/${urlString(curElem.name)}`}
                              className="text-info btn btn-white  text-sm"
                            >
                              {curElem.name} ({curElem.reports})
                            </Link>
                          </div>
                          <hr className="m-0 dashed" />
                          <div
                            id={`collapse-${i}`}
                            className="collapse "
                            data-parent="#accordion"
                            aria-labelledby={`heading-${i}`}
                          >
                            {curElem.children.map((Elem, i) => (
                              <Fragment key={Elem.id}>
                                <Link
                                  href={`industries/${urlString(Elem.name)}`}
                                  className="btn btn-white text-sm text-info ml-3"
                                >
                                  {Elem.name} ({Elem.reports})
                                </Link>

                                <hr className="m-0 dashed" />
                              </Fragment>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-12 col-sm-12">
                {reportList?.length === 0 && (
                  <div className="text-center m-5 p-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">No More Records Found</span>
                    </div>
                  </div>
                )}
                <InfiniteScroll
                  dataLength={reportList.length} //This is important field to render the next data
                  next={getMoreReport}
                  hasMore={hasMore}
                  loader={
                    <div className="text-center m-5 p-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  }
                  endMessage={
                    <p className="mt-2" style={{ textAlign: "center" }}>
                      <b>No More Records Found</b>
                    </p>
                  }
                  // scrollableTarget={scroll.toString()}
                >
                  {reportList?.map((report, i) => (
                    <div
                      className="card flex-md-row shadow-none rounded-0   mb-0 "
                      style={{ borderBottom: "1px dashed #ccc" }}
                      key={i + 1}
                      id={report.slug}
                    >
                      <div className="card-body d-flex flex-column align-items-start">
                        <p>
                          <i className="far fa-calendar-alt mr-2"></i>
                          <span>
                            {moment(report.pub_date).format("MMMM YYYY")}
                          </span>
                        </p>
                        <Link
                          target="_blank"
                          className="text-dark mb-0 report-heading"
                          href={`/report/${report.slug}`}
                          // onBlur={persistScrollPosition(report.slug)}
                          onClick={() =>
                            sessionStorage.setItem("key", report.slug)
                          }
                        >
                          {report.product_name}
                        </Link>

                        <div
                          className="card-text text-secondary mb-0 dangerously"
                          dangerouslySetInnerHTML={{
                            __html: report.product_description,
                          }}
                        >
                          {/* {report.name.slice(0, 150)}... */}
                        </div>
                        <div className="d-flax ">
                          <Link
                            href={`/contact/${report.slug}/download-sample`}
                            className="btn btn-success btn-sm mr-3  mt-3"
                            style={{ width: 180 }}
                            target="_blank"
                          >
                            <i className="fas fa-download"></i> Download Sample
                          </Link>

                          <Link
                            href={`/contact/${report.slug}/ask-questions`}
                            className="btn btn-info btn-sm mt-3"
                            style={{ width: 180 }}
                            target="_blank"
                          >
                            <i className="fas fa-question-circle"></i> Ask
                            Questions
                          </Link>
                        </div>
                      </div>
                      {/* <div className="card-footer bg-white d-flex flex-column align-items-start">
                          <strong className="d-inline-block my-2 text-dark">
                            Price
                          </strong>
                          <h4 className="text-primary">
                            {currencyInrFormat(report.price)}
                          </h4>
                        </div> */}
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Reports;

// export async function getServerSideProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

Reports.getInitialProps = async (ctx) => {
  const reportsData = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/reports?start=0&limit=10`
  );

  const catData = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXT_API}/front/categories`
  );

  return {
    data: {
      reportsData: reportsData.data.reports,
      count: reportsData.data.count,
      catData: catData.data,
    },
  };
};
