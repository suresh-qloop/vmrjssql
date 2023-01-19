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
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-articles?start=0&limit=4`
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
            <h4>Latest Publications</h4>
            <hr className="m-2 dashed" />
            <div className="row">
              {reportList?.map((report, i) => (
                <div className="col-md-12" key={i + 1}>
                  <div
                    className=" flex-md-row shadow-none  rounded-0   mb-0 "
                    style={{ borderBottom: "1px dashed #ccc" }}
                  >
                    <div className="card-body d-flex flex-column align-items-start ">
                      <p className="mb-0">
                        <strong>
                          <Link
                            className="text-dark"
                            href={`/report/${report.slug}`}
                          >
                            {report.product_name}
                          </Link>
                        </strong>
                      </p>

                      <p
                        className="card-text text-secondary mb-auto my-3 dangerously"
                        dangerouslySetInnerHTML={{
                          __html: report.product_description,
                        }}
                      >
                        {/* {report.name.slice(0, 150)}... */}
                      </p>
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
            <h4>Latest Articles</h4>
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
                        href={`/article/${article.id}`}
                      >
                        {article.headline}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/articles" className="btn btn-info my-4">
              View More Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
