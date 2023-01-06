import Link from "next/link";
import React from "react";

const ChaptersInfo = ({ slug }) => {
  return (
    <div className="card ">
      <div className="card-header  text-center p-2">
        <strong> Buy Chapters or Sections</strong>
      </div>
      <div className="card-body">
        <p className="m-0 pb-2  text-sm">
          Avail customized purchase options to meet your exact research needs:
        </p>
        <ul className="m-0 pl-3">
          <li>
            <span className=" text-sm">Buy sections of this report</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">Buy country level reports</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">Request for historical data</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">
              Request discounts available for Start-Ups & Universities
            </span>
          </li>
          <hr className="m-2 dashed" />
        </ul>
        <Link
          className="btn btn-primary text-center mt-2  from-control"
          href={`/contact/${slug}/request-for-special-pricing`}
        >
          Request for Special Pricing
        </Link>
      </div>
    </div>
  );
};

export default ChaptersInfo;
