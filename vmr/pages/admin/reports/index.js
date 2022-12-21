import React, { useEffect, useState, useRef, Fragment } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import axios from "axios";
import { currencyFormat } from "../../../components/utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";

import Swal from "sweetalert2";

const ReportList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();
  const [reportData, setReportData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [reportName, setReportName] = useState("");
  const [price, setPrice] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [shareWithReseller, setShareWithReseller] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState();

  const name = (report) => {
    return report.product_name;
  };
  const publisherName = (report) => {
    return report.publisher_name;
  };
  const metaTitle = (report) => {
    return report.meta_name;
  };
  const metaDescription = (report) => {
    return report.meta_desc;
  };
  const metaKeywords = (report) => {
    return report.meta_keywords;
  };
  const licenses = (report) => {
    return report.price;
  };
  const reportStatus = (report) => {
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
      selector: name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Publisher Name",
      selector: publisherName,
      sortable: true,
      width: "180px",
    },
    {
      name: "Meta Title",
      selector: metaTitle,
      sortable: true,
      width: "200px",
    },
    {
      name: "Meta Description",
      selector: metaDescription,
      sortable: true,
      width: "180px",
    },
    {
      name: "Meta Keywords",
      selector: metaKeywords,
      sortable: true,
      width: "180px",
      title: metaKeywords,
    },
    {
      name: "Price",
      selector: licenses,
      sortable: true,
      width: "130px",
      cell: (report) => <div>{currencyFormat(report.price)}</div>,
    },
    {
      name: "Status",
      selector: reportStatus,
      sortable: true,
      width: "130px",
      cell: (report) => (
        <Fragment>
          {report.is_active === 1 && (
            <span className="badge bg-success ">Active</span>
          )}
          {report.is_active === 2 && (
            <span className="badge  bg-info">InProgress</span>
          )}
          {report.is_active === 0 && (
            <span className="badge  bg-warning">Inactive</span>
          )}
          {report.is_active === 4 && (
            <span className="badge  bg-primary">ReadyToActive</span>
          )}
        </Fragment>
      ),
    },
    {
      name: "Action",
      button: true,
      grow: 1,
      width: "380px",
      cell: (report) => (
        <div>
          <Link
            href={`/admin/reports/view/${report.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-success mr-2"
          >
            View
          </Link>
          <Link
            href={`/admin/reports/edit/${report.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-info mr-2"
          >
            Edit
          </Link>

          {report.is_active === 1 ? (
            <button
              type="button"
              onClick={() => {
                statusHandler(report.id);
              }}
              className="btn btn-sm btn-outline-warning mr-2"
              style={{ width: 101 }}
            >
              Deactivate
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                statusHandler(report.id);
              }}
              className="btn btn-sm btn-outline-primary mr-2"
              style={{ width: 101 }}
            >
              Activate
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              deleteReport(report._id);
            }}
            className="btn btn-sm btn-outline-danger mr-2"
          >
            Delete
          </button>
          <Link
            href={`/admin/reports/addfaqs/${report.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-primary mr-2"
          >
            FAQs
          </Link>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = reportData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );

  const rows_data_for_export = temp_rows.map((d1) =>
    columns
      .slice(0, columns.length - 1)
      .map((d2) => d2.selector.name)
      .map((d3) => d1[d3])
  );

  const columns_data_for_export = columns
    .slice(0, columns.length - 1)
    .map((d) => d.name);

  const download_pdf = () => {
    const doc = new jsPDF();

    const temp_rowData = temp_rows.map((d1) =>
      columns
        .slice(0, columns.length - 1)
        .map((d2) => d2.selector.name)
        .map((d3) => d1[d3])
    );
    doc.autoTable({
      head: [columns_data_for_export],
      body: temp_rowData,
    });
    doc.save("client_list.pdf");
  };

  useEffect(() => {
    getReportData();
    getCategoryList();
    // eslint-disable-next-line
  }, [status]);

  const getReportData = async () => {
    if (!(status === "loading")) {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/report`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          //   console.log(res.data.reports);
          setReportData(res.data);
          setLoading(false);
          if (reportData < 0) {
            setNoRecords(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCategoryList = async () => {
    if (!(status === "loading")) {
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
      .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/report/status/${id}`, {
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

  const deleteReport = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/report/${id}`, {
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          })
          .then((res) => {
            getReportData();
            notify("success", "Report Deleted Successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/report/search?name=${reportName}&&price=${price}&&status=${searchStatus}&&reseller=${shareWithReseller}&&category_id=${category}`,
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
                <div className="row my-3">
                  <div className="col-md-8 col-sm-8  text-left">
                    <Link
                      href="/admin/reports/add"
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary mb-2"
                    >
                      Add Report
                    </Link>
                  </div>
                  <div className="col-md-3 col-sm-3 ">
                    <label className="d-flex ">
                      <input
                        type="search"
                        placeholder="Enter text for search"
                        className="form-control ml-3  "
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="col-md-1 col-sm-1  text-right">
                    <div className="dt-buttons btn-group flex-wrap">
                      <button
                        className="btn btn-secondary buttons-csv buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                      >
                        <CSVLink
                          className="text-decoration-none"
                          data={rows_data_for_export}
                          headers={columns_data_for_export}
                          filename={"client_list.csv"}
                        >
                          <span className="text-light">CSV</span>
                        </CSVLink>
                      </button>

                      <button
                        className="btn btn-secondary buttons-pdf buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                        onClick={download_pdf}
                      >
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
                <form onSubmit={searchHandler}>
                  <div className="row">
                    <div className="col-md-2">
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
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label
                          htmlFor="price"
                          className="col-sm-12 col-form-label "
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Price"
                          className="form-control "
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
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
                          <option value="">All</option>
                          {/* <option value="readyToActive">Ready To Active</option> */}
                          <option value={1}>Active</option>
                          <option value={0}>InActive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label
                          htmlFor="shareWithReseller"
                          className="col-sm-12 col-form-label "
                        >
                          Share with reseller?
                        </label>
                        <select
                          className="form-control"
                          id="shareWithReseller"
                          onChange={(e) => setShareWithReseller(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
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
                            <option value="">All</option>
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
                                        {Elem.category_name}
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
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label htmlFor="" className="col-sm-12 col-form-label">
                          &nbsp;
                        </label>
                        <button
                          type="submit"
                          className="btn  btn-success "
                          style={{ width: 101 }}
                        >
                          Search
                        </button>
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
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
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
          <i class="fas fa-chevron-up"></i>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ReportList;
