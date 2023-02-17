import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../../components/Frontend/Breadcrumb";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
// import { currencyInrFormat } from "../utils/utils.js";
// import { currencyInrFormat } from "../../utils/currencyInrFormat";
import moment from "moment/moment";
import { Fragment } from "react";

import { useRouter } from "next/router";
import { urlString } from "../../utils/urlString";
import Head from "next/head";

// import { useSession } from "next-auth/react";

const Reports = () => {
  const router = useRouter();
  const catName = router.query.name;

  const [categoryList, setCategoryList] = useState();
  const [categoryDetail, setCategoryDetail] = useState();

  const [reportList, setReportList] = useState([]);
  const [count, setCount] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  // const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    if (catName) {
      getCategoryDetail();
      getCategoryList();
      getReportList();
    }
    // eslint-disable-next-line
  }, [catName]);
  useEffect(() => {
    setHasMore(count > reportList.length ? true : false);
  }, [reportList]);

  const getCategoryList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/categories`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategoryDetail = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/cat/${catName}`)
      .then((res) => {
        setCategoryDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReportList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/category/${catName}?start=0&limit=10`
      )
      .then((res) => {
        setReportList(res.data.reports);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getCategoryReportsHandler = async (catId) => {
  //   setCategoryId(catId);
  //   await axios
  //     .get(
  //       `${process.env.NEXT_PUBLIC_NEXT_API}/front/category/${catId}?start=0&limit=10`
  //     )
  //     .then((res) => {
  //       setReportList(res.data.reports);
  //       setCount(res.data.count);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getMoreReport = async () => {
    if (catName) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_NEXT_API}/front/category/${catName}?start=${reportList.length}&limit=10`
        )
        .then((res) => {
          const reports = res.data.reports;
          setReportList((reportList) => [...reportList, ...reports]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        <meta name="keywords" content={categoryDetail?.long_desc} />
        <meta name="description" content={categoryDetail?.meta_desc}></meta>

        <title>
          Explore All Category Wise Industrial Market Research Reports
        </title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        <Navbar />
        <Breadcrumb name={categoryDetail?.category_name} />
        <div className="bg-light pb-5">
          <div className="container bg-white pb-5 py-3">
            <div className="row">
              <div className="col-md-12 px-4">
                <h3>{categoryDetail?.category_name}</h3>
                <hr className="m-2 dashed" />
                <p className="text-secondary text-sm justify-content-center">
                  {categoryDetail?.short_desc}
                </p>
              </div>
              <div className="col-md-3">
                <div className="card shadow-none mb-0">
                  <div className="card-header">
                    <h2 className="card-title">Reports by Industry</h2>
                  </div>

                  <div className="card-body p-0">
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
                              href={`../industries/${urlString(curElem.name)}`}
                              className={`btn btn-white text-sm ${
                                catName === curElem.name
                                  ? "text-dark"
                                  : "text-info"
                              }   `}
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
                                <i className="far fa-minus-square text-info "></i>

                                <Link
                                  href={`../industries/${urlString(Elem.name)}`}
                                  className={`btn btn-white text-sm ${
                                    catName === Elem.id
                                      ? "text-dark"
                                      : "text-info"
                                  }   ml-3`}
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
              <div className="col-md-9">
                <div className="row">
                  {reportList?.length === 0 && (
                    <div className="text-center m-5 p-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
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
                  >
                    {reportList?.map((report, i) => (
                      <div className="col-md-12" key={i + 1}>
                        <div
                          className="card flex-md-row shadow-none rounded-0   mb-0 "
                          style={{ borderBottom: "1px dashed #ccc" }}
                        >
                          <div className="card-body d-flex flex-column align-items-start">
                            <p>
                              <i className="far fa-calendar-alt mr-2"></i>
                              <span>
                                {moment(report.pub_date).format("MMMM YYYY")}
                              </span>
                            </p>
                            <p className="mb-0 report-heading">
                              <Link
                                target="_blank"
                                className="text-dark"
                                href={`/report/${report.slug}`}
                              >
                                {report.product_name}
                              </Link>
                            </p>

                            <p
                              className="card-text text-secondary mb-auto my-3 dangerously"
                              dangerouslySetInnerHTML={{
                                __html: report.product_description,
                              }}
                            >
                              {/* {report.name.slice(0, 150)}... */}
                            </p>
                            <div className="d-flax ">
                              <Link
                                href={`/contact/${report.slug}/download-sample`}
                                className="btn btn-success btn-sm mr-3  mt-3"
                                style={{ width: 180 }}
                                target="_blank"
                              >
                                <i className="fas fa-download"></i> Download
                                Sample
                              </Link>

                              <Link
                                href={`/contact/${report.slug}/ask-questions`}
                                className="btn btn-info btn-sm mt-3"
                                style={{ width: 150 }}
                                target="_blank"
                              >
                                <i className="fas fa-question-circle"></i> Ask
                                Questions
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
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
