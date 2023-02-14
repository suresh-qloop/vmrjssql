import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { urlString } from "../../utils/urlString";

const Navbar = (props) => {
  const navigate = useRouter();
  const [name, setName] = useState("");
  const [categoryList, setCategoryList] = useState();
  const [aliasList, setAliasList] = useState();
  const [dropDown, setDropDown] = useState(false);

  const searchHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    navigate.push(`/search-results?q=${name}`);
  };
  const autoSearchHandler = async (e) => {
    // e.preventDefault();
    if (name) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_NEXT_API}/front/auto-search?query=${name}`
        )
        .then((res) => {
          setAliasList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    autoSearchHandler();

    // eslint-disable-next-line
  }, [name]);

  return (
    <div className="bg-white  shadow-sm rounded sticky-top">
      <div className=" container">
        <nav className="navbar navbar-expand-lg navbar-white bg-white">
          <Link className="navbar-brand" href="/">
            <img
              src="/dist/img/logos/vmr-logo.webp"
              width="176"
              height="65"
              alt="Value Market Research"
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
            <ul className="navbar-nav ml-auto">
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
                  className={`nav-link dropdown-toggle ${
                    navigate.pathname === "/category-list" ? "active" : ""
                  }`}
                  href="/category-list"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Industries
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categoryList?.map((curElem, i) => {
                    return (
                      <Fragment key={i + 1}>
                        <Link
                          className="dropdown-item"
                          href={`/industries/${urlString(curElem.name)}`}
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
                    navigate.pathname === "/pressreleases" ? "active" : ""
                  }`}
                  href="/pressreleases"
                >
                  Press Release
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/about-us" ? "active" : ""
                  }`}
                  href="/about-us"
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    navigate.pathname === "/contact-us" ? "active" : ""
                  }`}
                  href="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <form
                  className="form-inline  "
                  onSubmit={searchHandler}
                  autoComplete="off"
                >
                  <div className="dropdown search">
                    <input
                      className="form-control mr-sm-2 "
                      // style={{ width: "200px" }}
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                      onChange={(e) => {
                        setName(e.target.value);

                        if (e.target.value === "") {
                          setDropDown(false);
                          setAliasList([]);
                        } else {
                          setDropDown(true);
                        }
                      }}
                      required
                      // id="dropdownMenuButton1"
                      // data-bs-toggle="dropdown"
                      // aria-expanded="false"
                    />

                    <ul
                      className={`dropdown-menu ${
                        dropDown ? "d-block" : "d-none"
                      }`}
                      // aria-labelledby="dropdownMenuButton1"
                      // style={{ width: "200px" }}
                    >
                      {aliasList?.map((alias, i) => {
                        return (
                          <li key={i + 1}>
                            <Link
                              className="dropdown-item text-sm"
                              href={`/report/${alias.slug}`}
                            >
                              {alias.alias.slice(0, 35)}...
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    id="search"
                    aria-label="search"
                  >
                    <i className="fas fa-search text-light"></i>
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
