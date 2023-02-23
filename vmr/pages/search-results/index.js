import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
// import Breadcrumb from "../../components/Frontend/Breadcrumb";
import { useRouter } from "next/router";
import moment from "moment/moment";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// import { urlString } from "../../utils/urlString";
import { useForm } from "react-hook-form";
import Highlighter from "react-highlight-words";
import notify from "../../components/helpers/Notification";

const ReportDetails = () => {
  const [count, setCount] = useState(null);
  const [reportList, setReportList] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  // setReportData(data);

  const router = useRouter();
  const { q } = router.query;

  const getReportData = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/search?q=${q}&start=0&limit=10`
      )
      .then((res) => {
        setReportList(res.data.reports);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [name, setName] = useState(q);

  const searchHandler = async (e) => {
    e.preventDefault();
    router.push(`/search-results?q=${name}`);
  };

  const getMoreReport = async () => {
    if (q) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_NEXT_API}/front/search?q=${q}&start=${reportList.length}&limit=2`
        )
        .then((res) => {
          const reports = res.data.reports;
          setReportList((reportList) => [...reportList, ...reports]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!q) {
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
    // eslint-disable-next-line
  }, [reportList]);

  useEffect(() => {
    // if (!q) {
    //   router.push("/");
    //   return;
    // }
    getReportData();

    // eslint-disable-next-line
  }, [q]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/front/search-enquirie`, data)
      // .then((res) => {
      // notify("success", "Form Submitted Successfully");
      // router.push("/");
      // })
      .catch(function (error) {
        console.log(error);
        notify("error", error.response.data.message);
      });
    router.push("/thank-you");
  };

  return (
    <Fragment>
      <NavbarTop />
      <Navbar />
      {/* <Breadcrumb name="Industrial Equipment" /> */}
      <div className=" bg-light pb-5 pt-3">
        <div className="container bg-white py-3 pb-5">
          <div className="row">
            <div className="col-md-12 px-4">
              <h3>Search Results</h3>
            </div>
            {/* <div className="col-md-3">
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
                                  <Link
                                    href={`../industries/${urlString(
                                      Elem.name
                                    )}`}
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
            </div> */}
            <div className="col-md-12">
              <form onSubmit={searchHandler} autoComplete="off">
                <div className="row px-4 py-3">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Search"
                      aria-label="Search"
                      defaultValue={q}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-md-2">
                    <button type="search" className="btn btn-primary">
                      <i className="fas fa-search"></i> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-md-12">
              <div className="row">
                {reportList.length > 0 ? (
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
                                <Highlighter
                                  highlightClassName="YourHighlightClass"
                                  searchWords={[q]}
                                  autoEscape={true}
                                  textToHighlight={report.product_name}
                                />
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
                                href={`/contact/${report.slug}/download-sample/`}
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
                ) : (
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 ">
                        <div className="text-center pt-4">
                          <h5 className="">
                            <strong>
                              {" "}
                              Didn't find what you are looking for?
                            </strong>
                          </h5>
                          <h5 className="">
                            Please fill out the form. We will contact you within
                            24 hours.
                          </h5>
                        </div>
                        <hr className="dashed" />
                      </div>
                      <div className="col-md-12">
                        <form
                          className="px-5 py-3"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div
                            className={`row  ${errors.fullName ? "" : "mb-3"}`}
                          >
                            <label
                              htmlFor="fullName"
                              className="col-sm-4 col-form-label"
                            >
                              Full Name
                            </label>
                            <div className="col-sm-8">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fas fa-user"></i>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className={`form-control  ${
                                    errors.fullName ? "is-invalid" : ""
                                  }`}
                                  id="fullName"
                                  placeholder="Full Name"
                                  {...register("fullName", {
                                    required: "This field is required",
                                    pattern: {
                                      value: /^(\w\w+)\s(\w+)$/i,
                                      message: "Please Enter Your Full Name",
                                    },
                                  })}
                                />
                                {errors.fullName && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.fullName.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`row  ${
                              errors.corporateEmail ? "" : "mb-3"
                            }`}
                          >
                            <label
                              htmlFor="corporateEmail"
                              className="col-sm-4 col-form-label"
                            >
                              Corporate Email
                            </label>
                            <div className="col-sm-8">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.corporateEmail ? "is-invalid" : ""
                                  }`}
                                  id="corporateEmail"
                                  placeholder="Corporate Email"
                                  {...register("corporateEmail", {
                                    required: "This field is required",
                                    pattern: {
                                      value:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "invalid email address",
                                    },
                                  })}
                                  onPaste={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  onCopy={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                />
                                {errors.corporateEmail && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.corporateEmail.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`row  ${
                              errors.confirmEmail ? "" : "mb-3"
                            }`}
                          >
                            <label
                              htmlFor="confirmEmail"
                              className="col-sm-4 col-form-label"
                            >
                              Confirm Email
                            </label>
                            <div className="col-sm-8">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fas fa-envelope"></i>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.confirmEmail ? "is-invalid" : ""
                                  }`}
                                  id="confirmEmail"
                                  placeholder="Confirm Email"
                                  {...register("confirmEmail", {
                                    required: "This field is required",
                                    pattern: {
                                      value:
                                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "invalid email address",
                                    },
                                    validate: (value) => {
                                      const { corporateEmail } = getValues();
                                      return (
                                        corporateEmail === value ||
                                        "Email should match!"
                                      );
                                    },
                                  })}
                                  onPaste={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                  onCopy={(e) => {
                                    e.preventDefault();
                                    return false;
                                  }}
                                />
                                {errors.confirmEmail && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.confirmEmail.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`row  ${errors.message ? "" : "mb-3"}`}
                          >
                            <label
                              htmlFor="message"
                              className="col-sm-4 col-form-label"
                            >
                              Any Specific Requirement
                            </label>
                            <div className="col-sm-8">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fas fa-info-circle"></i>
                                  </span>
                                </div>
                                <textarea
                                  type="text"
                                  className={`form-control ${
                                    errors.message ? "is-invalid" : ""
                                  }`}
                                  id="message"
                                  placeholder="Any Specific Requirement"
                                  {...register("message", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.message && (
                                  <span className="error invalid-feedback">
                                    <p>{errors.message.message}</p>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-sm-8">
                            <input
                              type="hidden"
                              className="form-control"
                              id="type"
                              placeholder="type"
                              {...register("type")}
                              value="Search"
                            />
                          </div>

                          <div className="col-md-12 text-center">
                            <button className="btn btn-info justify-content-center mt-2">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
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
