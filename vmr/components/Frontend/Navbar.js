import React from "react";
import Link from "next/link";
// import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = (props) => {
  const navigate = useRouter();
  const [name, setName] = useState();
  // const [count, setCount] = useState(null);
  // const [reportList, setReportList] = useState([]);

  const searchHandler = async (e) => {
    e.preventDefault();
    navigate.push(`/search-results/${name}`);
    // await axios
    //   .get(
    //     `${process.env.NEXT_PUBLIC_NEXT_API}/search?name=${name}&start=0&limit=2`
    //   )
    //   .then((res) => {
    //     setReportList(res.data.reports);
    //     setCount(res.data.count);
    // props.onSubmit(reportList);
    // props.searchName(name);
    // props.allCount(count);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };
  return (
    <div className=" bg-white py-2 shadow-sm rounded">
      <div className=" container">
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
          {/* <Link className="navbar-brand" href="/">
          </Link> */}
          <Link className="navbar-brand" href="/">
            <img
              src="https://www.valuemarketresearch.com/img/logos/vmr-logo.webp"
              width="150"
              height="50"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Industries
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" href="/">
                    Action
                  </Link>
                  <Link className="dropdown-item" href="/">
                    Another action
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" href="/">
                    Something else here
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/reports" ? "active" : ""
                  }`}
                  href="/reports"
                  prefetch={true}
                >
                  Reports
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  Press Release
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/contact" ? "active" : ""
                  }`}
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={searchHandler}>
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                <i className="fas fa-search"></i> Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
