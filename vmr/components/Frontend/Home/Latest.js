import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";

export default function Latest() {
  const [reportList, setReportList] = useState([]);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    getReportList();
    getArticleList();
    // eslint-disable-next-line
  }, []);

  const getReportList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-reports?start=0&limit=2`
      )
      .then((res) => {
        setReportList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getArticleList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-articles?start=0&limit=2`
      )
      .then((res) => {
        setArticleList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="bg-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8">
            <h3>Latest Publications</h3>
            <hr className="m-2 dashed" />
            <div className="row">
              {reportList?.map((report, i) => (
                <div className="col-md-12" key={i + 1}>
                  <div
                    className=" flex-md-row shadow-none  rounded-0   mb-0 "
                    style={{ borderBottom: "1px dashed #ccc" }}
                  >
                    <div className="card-body d-flex flex-column align-items-start ">
                      <p>
                        <i className="far fa-calendar-alt mr-2"></i>
                        <span>
                          {moment(report.pub_date).format("YYYY-MM-D H:MM:SS")}
                        </span>
                      </p>
                      <h5 className="mb-0">
                        <Link
                          className="text-dark"
                          href={`/report/${report.id}`}
                        >
                          {report.product_name}
                        </Link>
                      </h5>

                      <p
                        className="card-text text-secondary mb-auto my-3 dangerously"
                        dangerouslySetInnerHTML={{
                          __html: report.product_description,
                        }}
                      >
                        {/* {report.name.slice(0, 150)}... */}
                      </p>
                      {/* <div className="d-flax ">
                    <button
                      className="btn btn-success btn-sm mr-3  mt-3"
                      style={{ width: 180 }}
                    >
                      <i className="fas fa-download"></i> Download Sample
                    </button>

                    <button
                      className="btn btn-info btn-sm mt-3"
                      style={{ width: 150 }}
                    >
                      <i className="fas fa-question-circle"></i> Ask
                      Questions
                    </button>
                  </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/reports" className="btn btn-info my-4">
              View More Publications
            </Link>
          </div>
          <div className="col-md-4">
            <h3>Latest Articles</h3>
            <hr className="m-2 dashed" />
            {articleList?.map((article, i) => (
              <div className="col-md-12" key={i + 1}>
                <div
                  className=" flex-md-row shadow-none  rounded-0   mb-0 "
                  style={{ borderBottom: "1px dashed #ccc" }}
                >
                  <div className="card-body d-flex flex-column align-items-start ">
                    <p className="mb-0">
                      <Link
                        className="text-dark"
                        // href={`/report/${article.slug}`}
                        href={`/`}
                      >
                        {article.headline}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-info my-4">View More Articles</button>
          </div>
        </div>
      </div>
    </section>
  );
}
