import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
import moment from "moment/moment";

import BackTop from "../components/common/BackTop";

const UpcomingReports = () => {
  const [reportList, setReportList] = useState([]);
  const [count, setCount] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getReportList();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setHasMore(count > reportList.length ? true : false);
    // eslint-disable-next-line
  }, [reportList]);

  const getReportList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/upcoming-reports?start=0&limit=10`
      )
      .then((res) => {
        setReportList(res.data.reports);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMoreReport = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/upcoming-reports?start=${reportList.length}&limit=10`
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
    <div className="wrapper">
      <NavbarTop />

      <Navbar />
      <Breadcrumb name="Upcoming Reports" />
      <div className=" bg-light pb-5 pt-2">
        <div className="container bg-white pb-5 pt-4">
          <div className="row">
            <div className=" col-lg-12 col-md-12 px-4">
              <h3>Upcoming Reports</h3>
            </div>

            <div className="col-lg-12 col-md-12">
              <InfiniteScroll
                dataLength={reportList.length} //This is important field to render the next data
                next={getMoreReport}
                hasMore={hasMore}
                loader={
                  <div className="text-center m-5 p-5">
                    <div className="spinner-border text-primary" role="status">
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
                        className="text-dark mb-0 report-heading"
                        href={`/report/${report.slug}`}
                        onClick={() =>
                          sessionStorage.setItem("key", report.slug)
                        }
                      >
                        {report.product_name}
                      </Link>

                      <p
                        className="card-text text-secondary mb-0 dangerously"
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
                        >
                          <i className="fas fa-download"></i> Download Sample
                        </Link>

                        <Link
                          href={`/contact/${report.slug}/ask-questions`}
                          className="btn btn-info btn-sm mt-3"
                          style={{ width: 150 }}
                        >
                          <i className="fas fa-question-circle"></i> Ask
                          Questions
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
      <Footer />
    </div>
  );
};

export default UpcomingReports;
