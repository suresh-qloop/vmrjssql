import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

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
      <div className="container py-4">
        <div className="row">
          <div className="col-md-8">
            <h5 className="border p-2  blue-background text-light text-center">
              <i className="far fa-address-card mr-2"></i>
              Latest Market Research Reports
            </h5>
            {/* <hr className="m-2 dashed" /> */}
            {reportList?.map((report, i) => (
              <div
                className=" flex-md-row shadow-none  rounded-0  border"
                style={{ borderBottom: "1px dashed #ccc" }}
                key={i + 1}
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
            <div className="card-body d-flex flex-column align-items-start border">
              <p className="mb-0">
                <strong>
                  Checkout all of our
                  <Link className=" ml-1" href="/reports">
                    Research Reports
                  </Link>
                </strong>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="border p-2  blue-background text-light text-center">
              <i className="fas fa-newspaper mr-2"></i> Latest Press Releases
            </h5>

            {pressReleaseList?.map((pressRelease, i) => (
              <div
                className="flex-md-row shadow-none rounded-0 mb-0 border"
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

            <div className="card-body d-flex flex-column align-items-start text-sm border mb-3">
              <p className="mb-0">
                <strong>
                  Checkout all of our
                  <Link className=" ml-1" href="/pressreleases">
                    Press Releases
                  </Link>
                </strong>
              </p>
            </div>

            <h5 className="border p-2  blue-background text-light text-center">
              <i className="fas fa-newspaper mr-2"></i> Latest Analysis
            </h5>
            {/* <hr className="m-2 dashed" /> */}

            {analysisList?.map((analysis, i) => (
              <div
                className=" flex-md-row shadow-none  rounded-0   mb-0 border"
                // style={{ borderBottom: "1px dashed #ccc" }}
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
            <div className="card-body d-flex flex-column align-items-start text-sm border mb-3">
              <p className="mb-0">
                <strong>
                  Checkout all of our
                  <Link className=" ml-1" href="/analysis">
                    Analysis
                  </Link>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
