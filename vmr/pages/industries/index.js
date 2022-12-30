import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import BackTop from "../../components/common/BackTop";
import Breadcrumb from "../../components/Frontend/Breadcrumb";
import Footer from "../../components/Frontend/Footer";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import LatestReport from "../../components/Frontend/SideBar/LatestReport";

import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState();

  const getCategoryList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/categories`)
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategoryList();
    // getCategoryList();

    // eslint-disable-next-line
  }, [router.asPath]);
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Industries" />
      <div className=" bg-light pb-5 pt-3">
        <div className="container  ">
          <div className="row">
            <div className="col-md-8">
              <div className="">
                <div className="card-body p-0">
                  <div className="card">
                    <div className="card-header  ps-3 p-2">
                      <strong>INDUSTRIES</strong>
                    </div>
                    <div className="card-body">
                      <div id="accordion">
                        {categoryList?.map((curElem, i) => (
                          <Fragment key={i + 1}>
                            <div id={`heading-${i}`}>
                              {curElem.children.length > 0 ? (
                                <i
                                  //   role="button"
                                  data-toggle="collapse"
                                  href={`#collapse-${i}`}
                                  aria-expanded="true"
                                  aria-controls="collapse-1"
                                  className="far fa-plus-square text-info "
                                ></i>
                              ) : (
                                <i className="far fa-minus-square text-info "></i>
                              )}
                              <Link
                                href={`industries/${curElem.id}`}
                                className="text-info btn btn-white "
                              >
                                {curElem.name} ({curElem.reports})
                              </Link>
                            </div>
                            <hr className="m-0 dashed" />
                            <div
                              id={`collapse-${i}`}
                              className="collapse "
                              data-parent="#accordion"
                              aria-labelledby={`heading-${i}`}
                            >
                              {curElem.children.map((Elem, i) => (
                                <Fragment key={Elem.id}>
                                  {/* <i className="far fa-minus-square text-info "></i> */}
                                  <Link
                                    href={`industries/${Elem.id}`}
                                    className="btn btn-white  text-info ml-3"
                                  >
                                    {Elem.name} ({Elem.reports})
                                  </Link>

                                  <hr className="m-0 dashed" />
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <LatestReport />
            </div>
          </div>
        </div>
      </div>
      <BackTop />
      <Footer />
    </div>
  );
}
