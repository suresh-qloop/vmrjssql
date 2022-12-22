import React from "react";
import Link from "next/link";

const Breadcrumb = ({ name }) => {
  return (
    <div className=" py-3 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 d-flex">
            <Link href="/" className="text-dark">
              Home
            </Link>
            &nbsp;
            <span>/</span> &nbsp;
            <span>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
