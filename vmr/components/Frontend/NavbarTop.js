import React from "react";

const NavbarTop = () => {
  return (
    <div className=" dark-background ">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="nav-link d-flex text-light">
              <a
                className="text-light"
                href="mailto:sales@valuemarketresearch.com"
              >
                <i className="fas fa-envelope-open-text mr-3 mt-1"></i>
                &nbsp; sales@valuemarketresearch.com
              </a>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 text-right ">
            <div className="nav-link text-light">
              <i className="fas fa-phone-alt"></i> &nbsp; +1-888-294-1147
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
