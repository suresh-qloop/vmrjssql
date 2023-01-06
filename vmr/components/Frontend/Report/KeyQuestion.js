import Link from "next/link";
import React from "react";

const keyQuestion = ({ slug }) => {
  return (
    <div className="row border p-2">
      <div className="col-md-6">
        <h5 className="text-center  mb-3">
          KEY QUESTIONS ANSWERED BY THE REPORT
        </h5>
        <div className="border p-3 m-3">
          <Link href="/" className="text-info">
            What is the current market size and trends?
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            What will be the market size during the forecast period?
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            How various market factors such as a driver, restraints, and
            opportunity impact the market?
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            What are the dominating segment and region in the market and why?
          </Link>
          <hr className="m-2 dashed" />

          <Link
            href={`/contact/${slug}/request-free-sample-report`}
            className="btn btn-primary my-2  form-control"
          >
            Request Free Sample Report
          </Link>
        </div>
      </div>
      <div className="col-md-6">
        <h5 className="text-center mb-3">NEED SPECIFIC MARKET INFORMATION?</h5>
        <div className="border p-3 m-3">
          <Link href="/" className="text-info">
            <i className="fas fa-user text-lg mr-2"></i> What is the current
            market size and trends?
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            <i className="fas fa-users text-lg mr-2"></i> Share your specific
            research requirments for a customized report
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            <i className="fas fa-share-alt text-lg mr-2"></i>
            Request for due diligence and consumer centric studies
          </Link>
          <hr className="m-2 dashed" />
          <Link href="/" className="text-info">
            <i className="fas fa-recycle text-lg mr-2"></i>
            Request for study updates, segment specific and country level
            reports
          </Link>
          <hr className="m-2 dashed" />

          <button className="btn btn-primary my-2  form-control">
            Request For Customization
          </button>
        </div>
      </div>
    </div>
  );
};

export default keyQuestion;
