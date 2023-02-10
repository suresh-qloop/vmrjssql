import React from "react";

const WhyChooseUs = () => {
  return (
    <div className="bg-color text-white">
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-12 ">
            <div className="heading">
              <h4 className="text-center">Why Choose Us</h4>
            </div>

            <div className="row text-center mb-3">
              <div className="col-md-3">
                <div className="bg-box">
                  <i className="fas fa-user  mb-3"></i>
                  <h5> CLIENT FIRST POLICY</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-box">
                  <i className="fas fa-certificate  mb-3"></i>
                  <h5>EXCELLENT QUALITY</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-box">
                  <i className="fas fa-handshake  mb-3"></i>
                  <h5> AFTER SALES SUPPORT</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bg-box">
                  <i className="far fa-envelope mb-3"></i>
                  <h5> 24/7 EMAIL SUPPORT</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
