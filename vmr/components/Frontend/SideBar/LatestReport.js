import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Fragment } from "react";

const LatestReport = () => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    getReportList();

    // eslint-disable-next-line
  }, []);

  const getReportList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/latest-reports?start=0&limit=10`
      )
      .then((res) => {
        setReportList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card ">
      <div className="card-header  text-center p-2">
        <strong> Latest Reports</strong>
      </div>
      <div className="card-body">
        <ul className="m-0 pl-3">
          {reportList?.map((report, i) => (
            <Fragment key={i + 1}>
              <li>
                <Link className="text-dark" href={`/report/${report.slug}`}>
                  <span className="text-sm">{report.alias}</span>
                </Link>
              </li>
              <hr className="m-2 dashed" />
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LatestReport;
