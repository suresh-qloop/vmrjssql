import Link from "next/link";
import React from "react";

const keyQuestion = ({ slug }) => {
  return (
    // <div className="row border py-2">
    //   <div className="col-md-6">
    //     <h5 className="text-center  my-3">
    //       KEY QUESTIONS ANSWERED BY THE REPORT
    //     </h5>
    //     <div className="border p-3 text-info">
    //       What is the current market size and trends?
    //       <hr className="m-2 dashed text-info" />
    //       What will be the market size during the forecast period?
    //       <hr className="m-2 dashed text-info" />
    //       How various market factors such as a driver, restraints, and
    //       opportunity impact the market?
    //       <hr className="m-2 dashed text-info" />
    //       What are the dominating segment and region in the market and why?
    //       <hr className="m-2 dashed" />
    //       <Link
    //         href={`/contact/${slug}/request-free-sample-report`}
    //         className="btn btn-red mt-3  btn-block"
    //       >
    //         Request Free Sample Report
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="col-md-6">
    //     <h5 className="text-center my-3">NEED SPECIFIC MARKET INFORMATION?</h5>
    //     <div className="border p-3 text-info">
    //       <i className="fas fa-user text-lg mr-2"></i> What is the current
    //       market size and trends?
    //       <hr className="m-2 dashed text-info" />
    //       <i className="fas fa-users text-lg mr-2"></i> Share your specific
    //       research requirments for a customized report
    //       <hr className="m-2 dashed text-info" />
    //       <i className="fas fa-share-alt text-lg mr-2"></i>
    //       Request for due diligence and consumer centric studies
    //       <hr className="m-2 dashed text-info" />
    //       <i className="fas fa-recycle text-lg mr-2"></i>
    //       Request for study updates, segment specific and country level reports
    //       <hr className="m-2 dashed" />
    //       <Link
    //         href={`/contact/${slug}/request-customization`}
    //         className="btn btn-red mt-3  btn-block"
    //       >
    //         Request For Customization
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    // <div className="row form-bg-light py-2">
    //   <div className="col-md-6 ">
    //     <h5 className="text-center  my-3">
    //       KEY QUESTIONS ANSWERED BY THE REPORT
    //     </h5>
    //     <div className=" p-3 text-blue border">
    //       What is the current market size and trends?
    //       <hr className="m-2 dashed text-blue" />
    //       What will be the market size during the forecast period?
    //       <hr className="m-2 dashed text-blue" />
    //       How various market factors such as a driver, restraints, and
    //       opportunity impact the market?
    //       <hr className="m-2 dashed text-blue" />
    //       What are the dominating segment and region in the market and why?
    //       <hr className="m-2 dashed" />
    //       <Link
    //         href={`/contact/${slug}/request-free-sample-report`}
    //         className="btn btn-red mt-3  btn-block"
    //       >
    //         Request Free Sample Report
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="col-md-6">
    //     <h5 className="text-center my-3">NEED SPECIFIC MARKET INFORMATION?</h5>
    //     <div className=" p-3 text-blue border">
    //       <i className="fas fa-user text-lg mr-2"></i> What is the current
    //       market size and trends?
    //       <hr className="m-2 dashed text-blue" />
    //       <i className="fas fa-users text-lg mr-2"></i> Share your specific
    //       research requirements for a customized report
    //       <hr className="m-2 dashed text-blue" />
    //       <i className="fas fa-share-alt text-lg mr-2"></i>
    //       Request for due diligence and consumer centric studies
    //       <hr className="m-2 dashed text-blue" />
    //       <i className="fas fa-recycle text-lg mr-2"></i>
    //       Request for study updates, segment specific and country level reports
    //       <hr className="m-2 dashed" />
    //       <Link
    //         href={`/contact/${slug}/request-customization`}
    //         className="btn btn-red mt-3  btn-block"
    //       >
    //         Request For Customization
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="row report-page relat-reprt key-qust border">
      <div className="col-md-6 col-sm-6 padd-0">
        <h2 className="mb-2">
          <center>Key questions answered by the report</center>
        </h2>
        <div className="panel-group faq-quest">
          <ul className="mrkt-info key-qst-left">
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }}  className="py-3">
                {/* <span> */}
                What is the current market size and trends? {/* </span> */}
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }}  className="py-2">
                What will be the market size during the forecast period?
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }}  className="py-3">
                How various market factors such as a driver, restraints, and
                opportunity impact the market?
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }}  className="py-2">
                What are the dominating segment and region in the market and why
              </div>
            </li>
          </ul>
          <div className="pull-left req-free-btn">
            <Link
              href={`/contact/${slug}/request-free-sample-report`}
              className="btn"
              target="_blank"
              style={{ background: "rgb(217, 83, 79)" }}
            >
              Request Free Sample Report
            </Link>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-sm-6 padd-0">
        <h2 className="mb-2">
          <center>Need specific market information?</center>
        </h2>
        <div className="panel-group">
          <ul className="mrkt-info">
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }} >
                <i className="fa fa-user"></i>
                <span>Ask for free product review call with the author</span>
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }} >
                <i className="fa fa-users"></i>
                <span>
                  Share your specific research requirments for a customized
                  report
                </span>
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }} >
                <i className="fa fa-share-alt"></i>
                <span>
                  Request for due diligence and consumer centric studies
                </span>
              </div>
            </li>
            <li
              style={{
                boxShadow: "0 0 7px",
                backgroundColor: "#0074bd",
              }}
            >
              <div style={{ color: "#fff" }}>
                <i className="fa fa-recycle"></i>Request for study updates,
                segment specific and country level reports
              </div>
            </li>
          </ul>
          <div className="pull-left req-free-btn">
            <Link
              href={`/contact/${slug}/request-customization`}
              className="btn"
              target="_blank"
              style={{ backgroundColor: "#d9534f" }}
            >
              Request for Customization
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default keyQuestion;
