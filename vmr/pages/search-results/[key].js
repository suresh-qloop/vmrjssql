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
import { currencyInrFormat } from "../../utils/currencyInrFormat";
import InfiniteScroll from "react-infinite-scroll-component";

const ReportDetails = () => {
  const [count, setCount] = useState(null);
  const [reportList, setReportList] = useState([]);
  const [categoryList, setCategoryList] = useState();
  // const [categoryId, setCategoryId] = useState();
  const [hasMore, setHasMore] = useState(true);

  // setReportData(data);

  const router = useRouter();
  const { key } = router.query;

  const getReportData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/search?q=${key}&start=0&limit=10`
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
  //       `${process.env.NEXT_PUBLIC_NEXT_API}/category/${catId}?start=0&limit=2`
  //     )
  //     .then((res) => {
  //       setReportList(res.data.reports);
  //       setCount(res.data.count);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

  const getMoreReport = async () => {
    // if (categoryId) {
    //   await axios
    //     .get(
    //       `${process.env.NEXT_PUBLIC_NEXT_API}/front/category/${categoryId}?start=${reportList.length}&limit=10`
    //     )
    //     .then((res) => {
    //       const reports = res.data.reports;
    //       setReportList((reportList) => [...reportList, ...reports]);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    if (key) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_NEXT_API}/front/search?q=${key}&start=${reportList.length}&limit=2`
        )
        .then((res) => {
          const reports = res.data.reports;
          setReportList((reportList) => [...reportList, ...reports]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!key) {
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
    }
  };
  useEffect(() => {
    setHasMore(count > reportList.length ? true : false);
  }, [reportList]);

  useEffect(() => {
    if (!key) {
      return;
    }
    getReportData();
    getCategoryList();
  }, [key]);

  return (
    <Fragment>
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Industrial Equipment" />
      <div className=" bg-light pb-5 pt-3">
        <div className="container bg-white py-3 pb-5">
          <div className="row">
            <div className="col-md-12 px-4">
              <h3>Search Results</h3>
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
                          {/* <button
                            type="button"
                            onClick={() =>
                              getCategoryReportsHandler(curElem._id)
                            }
                            className="text-info btn btn-white text-sm"
                          >
                            {curElem.name}
                          </button> */}
                          <Link
                            href={`../industries/${curElem.id}`}
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
                            <Fragment key={i + 1}>
                              {Elem.isDeleted === false && (
                                <Fragment key={Elem._id}>
                                  {/* <i className="far fa-minus-square text-info "></i> */}
                                  {/* <button
                                    type="button"
                                    className="btn btn-white text-sm text-info ml-3"
                                    onClick={() =>
                                      getCategoryReportsHandler(Elem._id)
                                    }
                                  >
                                    {Elem.name}
                                  </button> */}
                                  <Link
                                    href={`../industries/${Elem.id}`}
                                    className="btn btn-white text-sm text-info ml-3"
                                  >
                                    {Elem.name} ({Elem.reports})
                                  </Link>

                                  <hr className="m-0 dashed" />
                                </Fragment>
                              )}
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
                          <h5 className="mb-0">
                            <Link
                              className="text-dark"
                              href={`/report/${report.slug}`}
                            >
                              {report.product_name}
                            </Link>
                            {/* <hr />
                            <p
                              className="text-dark"
                              onClick={() => {
                                router.push(
                                  `/report/${report.slug}`,
                                  `/report/${report.slug}`,
                                  {
                                    shallow: true,
                                  }
                                );
                              }}
                              // href={`/report/${report.slug}`}
                            >
                              {report.name}
                            </p> */}
                          </h5>

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
                              href={`/contact/download-sample/${report.slug}`}
                              className="btn btn-success btn-sm mr-3  mt-3"
                              style={{ width: 180 }}
                            >
                              <i className="fas fa-download"></i> Download
                              Sample
                            </Link>

                            <Link
                              href={`/contact/ask-questions/${report.slug}`}
                              className="btn btn-info btn-sm mt-3"
                              style={{ width: 150 }}
                            >
                              <i className="fas fa-question-circle"></i> Ask
                              Questions
                            </Link>
                          </div>
                        </div>
                        <div className="card-footer bg-white d-flex flex-column align-items-start">
                          <strong className="d-inline-block my-2 text-dark">
                            Price
                          </strong>
                          <h4 className="text-primary">
                            {currencyInrFormat(report.price)}
                          </h4>
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
    </Fragment>
  );
};

export default ReportDetails;
