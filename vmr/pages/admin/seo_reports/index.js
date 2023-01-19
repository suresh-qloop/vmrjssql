import React, { useEffect, useState, useRef, Fragment } from "react";
import DataTable from "react-data-table-component";

import "jspdf-autotable";

import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";

const ReportList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [reportName, setReportName] = useState("");
  const [cPrice, setCPrice] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState();

  useEffect(() => {
    searchHandler();
  }, [reportName, cPrice, searchStatus, category]);

  const product_name = (report) => {
    return report.product_name;
  };
  const meta_name = (report) => {
    return report.meta_name;
  };
  const meta_desc = (report) => {
    return report.meta_desc;
  };
  const meta_keywords = (report) => {
    return report.meta_keywords;
  };
  const is_active = (report) => {
    return report.is_active;
  };

  const customStyles = {
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Name",
      selector: product_name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Meta Title",
      selector: meta_name,
      sortable: true,
      width: "300px",
    },
    {
      name: "Meta Description",
      selector: meta_desc,
      sortable: true,
      width: "300px",
    },
    {
      name: "Meta Keywords",
      selector: meta_keywords,
      sortable: true,
      width: "300px",
      title: meta_keywords,
    },
    {
      name: "Status",
      selector: is_active,
      sortable: true,
      width: "130px",
      cell: (report) => (
        <Fragment>
          {report.is_active === 1 && (
            <span className="badge bg-success ">Active</span>
          )}
          {report.is_active === 2 && (
            <span className="badge  bg-info">ReadyToActive</span>
          )}
          {report.is_active === 0 && (
            <span className="badge  bg-warning">Inactive</span>
          )}
          {report.is_active === 4 && (
            <span className="badge  bg-primary">InProgress</span>
          )}
        </Fragment>
      ),
    },
    {
      name: "Action",
      button: true,
      grow: 1,
      width: "220px",
      cell: (report) => (
        <div>
          <Link
            href={`/admin/seo_reports/view/${report.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-success mr-2"
          >
            View
          </Link>
          <Link
            href={`/admin/seo_reports/edit/${report.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-info mr-2"
          >
            Edit
          </Link>
          {report.is_active === 1 ? (
            <button
              type="button"
              className="btn btn-sm  mr-2"
              style={{ width: 101 }}
            ></button>
          ) : (
            <button
              type="button"
              onClick={() => {
                statusHandler(report.id);
              }}
              className="btn btn-sm btn-outline-primary mr-2"
              style={{ width: 101 }}
              disabled={report.is_active === 2 ? false : true}
            >
              Activate
            </button>
          )}
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = reportData;

  useEffect(() => {
    getReportData();
    getCategoryList();

    // eslint-disable-next-line
  }, [status]);

  const getReportData = async () => {
    if (status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/seo-report`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setReportData(res.data);
          setLoading(false);
          if (reportData.length < 0) {
            setNoRecords(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCategoryList = async () => {
    if (status === "authenticated") {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/category/drop-list`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setCategoryList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const statusHandler = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/seo-report/status/${id}`, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        getReportData();
        notify("success", "Status Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHandler = async (e) => {
    if (status === "authenticated") {
      // e.preventDefault();
      setLoading(true);
      setReportData([]);
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_NEXT_API}/seo-report/search?name=${reportName}&&price=${cPrice}&&status=${searchStatus}&&category_id=${category}`,
          {
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          }
        )
        .then((res) => {
          setReportData(res.data);
          setLoading(false);
          if (reportData.length < 0) {
            setNoRecords(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Reports</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">All Reports</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Reports</h3>
            </div>
            <div className="card-body">
              <div
                id="example1_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <form onSubmit={searchHandler}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group ">
                        <label
                          htmlFor="reportName"
                          className="col-sm-12 col-form-label "
                        >
                          Product Name
                        </label>
                        <input
                          type="search"
                          placeholder="Enter Text For Search"
                          id="reportName"
                          className="form-control "
                          onChange={(e) => setReportName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group ">
                        <label
                          htmlFor="price"
                          className="col-sm-12 col-form-label "
                        >
                          Single User Price
                        </label>
                        <input
                          type="text"
                          pattern="[0-9]*"
                          placeholder="Price"
                          className="form-control "
                          value={cPrice}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              setCPrice(e.target.value);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group ">
                        <label
                          htmlFor="searchStatus"
                          className="col-sm-12 col-form-label "
                        >
                          Status
                        </label>
                        <select
                          id="searchStatus"
                          className="form-control "
                          onChange={(e) => setSearchStatus(e.target.value)}
                        >
                          <option defaultValue={3} value={3}>
                            All
                          </option>
                          {/* <option value="readyToActive">Ready To Active</option> */}
                          <option value={1}>Active</option>
                          <option value={2}>Ready To Active</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group ">
                        <label
                          htmlFor="category"
                          className="col-sm-12 col-form-label"
                        >
                          Choose Category
                        </label>
                        <div className="col-sm-12">
                          <select
                            as="select"
                            className="form-control"
                            id="category"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option hidden value="">
                              Select Category
                            </option>
                            <option defaultValue={3} value={3}>
                              All
                            </option>
                            {categoryList?.map((curElem, i) => {
                              return (
                                <Fragment key={i + 1}>
                                  <option
                                    key={curElem.id}
                                    value={curElem.id}
                                    className="optionGroup"
                                  >
                                    {curElem.name}
                                  </option>
                                  {curElem.children.map((Elem) => {
                                    return (
                                      <option
                                        key={Elem.id}
                                        className="optionChild"
                                        value={Elem.id}
                                      >
                                        {Elem.name}
                                      </option>
                                    );
                                  })}
                                </Fragment>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {loading && (
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <div
                        className="spinner-border text-danger text-center"
                        role="status"
                      ></div>
                    </div>
                  </div>
                )}
                <div ref={refContainer}>
                  {noRecords ? (
                    <p>"There are no records to display"</p>
                  ) : (
                    <DataTable
                      title="Client List"
                      customStyles={customStyles}
                      noDataComponent={"There are no records to display"}
                      columns={columns}
                      data={temp_rows}
                      pagination
                      striped
                      noHeader
                      highlightOnHover
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Link
          id="back-to-top"
          href="#"
          className="btn btn-primary back-to-top"
          role="button"
          aria-label="Scroll to top"
        >
          <i className="fas fa-chevron-up"></i>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ReportList;
