import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Navbar = (props) => {
  const navigate = useRouter();
  const [name, setName] = useState();
  const [categoryList, setCategoryList] = useState();

  const searchHandler = async (e) => {
    e.preventDefault();
    navigate.push(`/search-results/${name}`);
  };

  const getCategoryList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/category/drop-list`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategoryList();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white py-2 shadow-sm rounded sticky-top">
      <div className=" container">
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
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
                  href="/industries"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  Industries
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categoryList?.map((curElem, i) => {
                    return (
                      <Fragment key={i + 1}>
                        <Link
                          className="dropdown-item"
                          href={`industries/${curElem.id}`}
                          key={curElem.id}
                        >
                          {curElem.name}
                        </Link>
                        {/* {curElem.children.map((Elem) => {
                          return (
                            <Link
                              key={Elem.id}
                              className="dropdown-item"
                              href="/"
                            >
                              {Elem.category_name}
                            </Link>
                          );
                        })} */}
                      </Fragment>
                    );
                  })}
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/reports" ? "active" : ""
                  }`}
                  href="/reports"
                  // prefetch={true}
                >
                  Reports
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/articles" ? "active" : ""
                  }`}
                  href="/articles"
                >
                  Press Release
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/about" ? "active" : ""
                  }`}
                  href="/about"
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
