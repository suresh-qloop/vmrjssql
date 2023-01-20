import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import moment from "moment/moment";

export default function Latest() {
  const [reportList, setReportList] = useState([]);
  const [pressReleaseList, setPressReleaseList] = useState([]);
  const [analysisList, setAnalysisList] = useState([]);

  useEffect(() => {
    getReportList();
    getPressReleaseList();
    getAnalysisList();
    // eslint-disable-next-line
  }, []);

  const getReportList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-reports?start=0&limit=6`
      )
      .then((res) => {
        setReportList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPressReleaseList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-pressreleases?start=0&limit=4`
      )
      .then((res) => {
        setPressReleaseList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAnalysisList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-analysis?start=0&limit=4`
      )
      .then((res) => {
        setAnalysisList(res.data);
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
            {reportList?.map((report, i) => (
              <div
                className=" flex-md-row shadow-none  rounded-0   mb-0 key={i + 1}"
                style={{ borderBottom: "1px dashed #ccc" }}
              >
                <div className="card-body d-flex flex-column align-items-start ">
                  <p className="mb-0">
                    <strong>
                      <Link
                        className="text-dark"
                        href={`/report/${report.slug}`}
                      >
                        {report.product_name.slice(0, 170)}...
                      </Link>
                    </strong>
                  </p>

                  <p
                    className="card-text text-secondary mb-auto my-2 dangerously "
                    dangerouslySetInnerHTML={{
                      __html: report.product_description,
                    }}
                  >
                    {/* {report.name.slice(0, 150)}... */}
                  </p>
                </div>
              </div>
            ))}

            <Link href="/reports" className="btn btn-info my-4 btn-sm">
              View More Publications
            </Link>
          </div>
          <div className="col-md-4">
            <h4>Latest Press Releases</h4>
            <hr className="m-2 dashed" />

            {pressReleaseList?.map((pressRelease, i) => (
              <div
                className="flex-md-row shadow-none rounded-0 mb-0"
                style={{ borderBottom: "1px dashed #ccc" }}
                key={i + 1}
              >
                <div className="card-body d-flex flex-column align-items-start text-sm">
                  <p className="mb-0">
                    <Link
                      className="text-dark"
                      href={`/pressreleases/${pressRelease.slug}`}
                    >
                      {pressRelease.headline}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
            <Link href="/pressreleases" className="btn btn-info my-4 btn-sm">
              View More Press Releases
            </Link>

            <h4>Latest Analysis</h4>
            <hr className="m-2 dashed" />

            {analysisList?.map((analysis, i) => (
              <div
                className=" flex-md-row shadow-none  rounded-0   mb-0 "
                style={{ borderBottom: "1px dashed #ccc" }}
                key={i + 1}
              >
                <div className="card-body d-flex flex-column align-items-start text-sm">
                  <p className="mb-0">
                    <Link
                      className="text-dark"
                      href={`/analysis/${analysis.slug}`}
                    >
                      {analysis.headline}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
            <Link href="/analysis" className="btn btn-info my-4 btn-sm">
              View More Analysis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
