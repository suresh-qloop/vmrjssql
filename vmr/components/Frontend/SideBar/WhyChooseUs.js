import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="card ">
      <div className="card-header  text-center p-2">
        <strong> Why Choose Us</strong>
      </div>
      <div className="card-body">
        <ul
          className="m-0 p-0 text-left"
          style={{ listStyle: "none", margin: 0 }}
        >
          <li>
            <i className="fas fa-user mr-3"></i>
            <span className=" text-sm">Client First Policy</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <i className="fas fa-certificate mr-3"></i>
            <span className=" text-sm">Excellent Quality</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <i className="fas fa-handshake mr-3"></i>
            <span className=" text-sm">After Sales Support</span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <i className="far fa-envelope mr-3"></i>
            <span className=" text-sm">24/7 Email Support</span>
          </li>
          <hr className="m-2 dashed" />
        </ul>
      </div>
    </div>
  );
};

export default WhyChooseUs;
