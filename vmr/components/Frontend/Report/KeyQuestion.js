import Link from "next/link";
import React from "react";

const keyQuestion = ({ slug }) => {
  return (
    <div className="row border py-2">
      <div className="col-md-6">
        <h5 className="text-center  my-3">
          KEY QUESTIONS ANSWERED BY THE REPORT
        </h5>
        <div className="border p-3 text-info">
          What is the current market size and trends?
          <hr className="m-2 dashed text-info" />
          What will be the market size during the forecast period?
          <hr className="m-2 dashed text-info" />
          How various market factors such as a driver, restraints, and
          opportunity impact the market?
          <hr className="m-2 dashed text-info" />
          What are the dominating segment and region in the market and why?
          <hr className="m-2 dashed" />
          <Link
            href={`/contact/${slug}/request-free-sample-report`}
            className="btn btn-primary my-2  btn-block"
          >
            Request Free Sample Report
          </Link>
        </div>
      </div>
      <div className="col-md-6">
        <h5 className="text-center my-3">NEED SPECIFIC MARKET INFORMATION?</h5>
        <div className="border p-3 text-info">
          <i className="fas fa-user text-lg mr-2"></i> What is the current
          market size and trends?
          <hr className="m-2 dashed text-info" />
          <i className="fas fa-users text-lg mr-2"></i> Share your specific
          research requirments for a customized report
          <hr className="m-2 dashed text-info" />
          <i className="fas fa-share-alt text-lg mr-2"></i>
          Request for due diligence and consumer centric studies
          <hr className="m-2 dashed text-info" />
          <i className="fas fa-recycle text-lg mr-2"></i>
          Request for study updates, segment specific and country level reports
          <hr className="m-2 dashed" />
          <Link
            href={`/contact/${slug}/request-customization`}
            className="btn btn-primary my-2  btn-block"
          >
            Request For Customization
          </Link>
        </div>
      </div>
    </div>
  );
};

export default keyQuestion;
