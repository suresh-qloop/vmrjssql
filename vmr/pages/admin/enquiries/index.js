import React, { useEffect, useState, useRef, Fragment } from "react";

import DataTable from "react-data-table-component";
import axios from "axios";
import Link from "next/link";
import { CSVLink } from "react-csv";
import { useSession } from "next-auth/react";
import moment from "moment/moment";
// ES6 Modules or TypeScript

import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";

const EnquiriesList = () => {
  const { data } = useSession();
  const auth = useSession();

  const refContainer = useRef();

  const [enquirieData, setEnquirieData] = useState([]);
  const [csvData, setCSVData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);
  const [ratting, setRatting] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [productName, setProductName] = useState();
  const [createDate, setCreateDate] = useState();
  const [createDateCheck, setCreateDateCheck] = useState(false);

  const id = (enquirie) => {
    return enquirie.id;
  };
  const first_name = (enquirie) => {
    return enquirie.first_name;
  };
  const last_name = (enquirie) => {
    return enquirie.last_name;
  };
  const subject = (enquirie) => {
    return enquirie.subject;
  };

  const email = (enquirie) => {
    return enquirie.email;
  };
  const product_name = (enquirie) => {
    return enquirie.product_name;
  };
  const publisher_name = (enquirie) => {
    return enquirie.publisher_name;
  };
  const status = (enquirie) => {
    return enquirie.status;
  };
  const rating = (enquirie) => {
    return enquirie.rating;
  };
  const message = (enquirie) => {
    return enquirie.message;
  };

  const visited_ip = (enquirie) => {
    return enquirie.visited_ip;
  };
  const organisation = (enquirie) => {
    return enquirie.organisation;
  };

  const job_title = (enquirie) => {
    return enquirie.job_title;
  };
  const country = (enquirie) => {
    return enquirie.country;
  };

  const created = (enquirie) => {
    return enquirie.created;
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
      name: "Id",
      selector: id,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: first_name,
      last_name,
      sortable: true,
      width: "140px",
      cell: (enquirie) => (
        <div>
          {enquirie.first_name}
          &nbsp;
          {enquirie.last_name}
        </div>
      ),
    },
    {
      name: "Ref page",
      selector: subject,
      sortable: true,
      width: "150px",
      cell: (enquirie) => <div>{enquirie.subject.slice(12)}</div>,
    },
    {
      name: "Email",
      selector: email,
      sortable: true,
      width: "290px",
    },
    {
      name: "Product Name",
      selector: product_name,
      sortable: true,
      width: "290px",
    },
    {
      name: "Publisher Name",
      selector: publisher_name,
      sortable: true,
      width: "205px",
    },
    {
      name: "Progress",
      selector: status,
      sortable: true,
      width: "150px",
      cell: (enquirie) => (
        <Fragment>
          <select
            className="form-control-sm"
            id="eStatus"
            defaultValue={enquirie.status}
            onChange={(e) => {
              statusHandler(e, enquirie.id);
            }}
          >
            <option value={0}>No Status</option>
            <option value={1}>Closed</option>
            <option value={2}>Waiting</option>
            <option value={3}>DnD</option>
            <option value={4}>Not Interested</option>
            <option value={5}>Junk</option>
            <option value={6}>Lost</option>
          </select>
        </Fragment>
      ),
    },
    {
      name: "Ratting",
      selector: rating,
      sortable: true,
      width: "140px",
      cell: (enquirie) => (
        <Fragment>
          <select
            className="form-control-sm"
            id="eStatus"
            defaultValue={enquirie.rating}
            onChange={(e) => {
              ratingHandler(e, enquirie.id);
            }}
          >
            <option value={0}>No Status</option>
            <option value={1}>Hot</option>
            <option value={2}>Warm</option>
            <option value={3}>Cold</option>
            <option value={4}>Very Hot</option>
          </select>
        </Fragment>
      ),
    },
    {
      name: "Message",
      selector: message,
      sortable: true,
      width: "140px",
    },
    {
      name: "Visited IP",
      selector: visited_ip,
      sortable: true,
      width: "140px",
    },
    {
      name: "Organisation",
      selector: organisation,
      sortable: true,
      width: "140px",
    },
    {
      name: "Job Title",
      selector: job_title,
      sortable: true,
      width: "140px",
    },
    {
      name: "Country",
      selector: country,
      sortable: true,
      width: "140px",
    },
    {
      name: "Created",
      selector: created,
      sortable: true,
      width: "220px",
      cell: (enquirie) => (
        <div>
          {enquirie.created
            ? moment(enquirie.created).format().slice(0, 19).replace("T", " ")
            : null}
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = enquirieData;

  const rows_data_for_export = csvData.map((d1) =>
    columns
      .slice(0, columns.length)
      .map((d2) => d2.selector.name)
      .map((d3) => d1[d3])
  );
  const columns_data_for_export = columns
    .slice(0, columns.length)
    .map((d) => d.name);

  useEffect(() => {
    getEnquirieData();
    getCSVData();
    // eslint-disable-next-line
  }, [auth.status]);

  const getEnquirieData = async () => {
    if (auth.status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/enquirie`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setEnquirieData(res.data);
          setLoading(false);
          if (res.data.length < 0) {
            setNoRecords(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCSVData = async () => {
    if (auth.status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/enquirie/csv`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setCSVData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const statusHandler = async (e, id) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_NEXT_API}/enquirie/status/${id}`,
        { status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        getEnquirieData();
        notify("success", "Status Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ratingHandler = async (e, id) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_NEXT_API}/enquirie/rating/${id}`,
        { rating: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        getEnquirieData();
        notify("success", "Ratting Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    let query = ``;

    query += `ratting=${ratting}`;

    query += `&filterStatus=${filterStatus}`;

    query += `&productName=${productName}`;

    // if (createDateCheck == true) {
    //   query += `&createDate=${createDate}`;
    // } else {
    //   query += `&createDate=${null}`;
    // }
    query += `&createDate=${createDate}`;

    query += `&createDateCheck=${createDateCheck}`;

    if (auth.status === "authenticated") {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/enquirie/search?${query}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setEnquirieData(res.data);
          if (res.data.length < 0) {
            setNoRecords(true);
          }
          // getEnquirieData();
          // notify("success", "Status Updated Successfully");
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
                <h1>Enquiries</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">All Enquiries</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Enquiries</h3>
            </div>
            <div className="card-body">
              <div
                id="example1_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <form onSubmit={searchHandler}>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label
                          htmlFor="ratting"
                          className="col-sm-12 col-form-label "
                        >
                          Filter By Ratting
                        </label>
                        <select
                          className="form-control"
                          multiple
                          data-live-search="true"
                          onChange={(e) => {
                            let value = Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            );
                            setRatting(value);
                          }}
                        >
                          <option value={0}>No Status</option>
                          <option value={1}>Hot</option>
                          <option value={2}>Warm</option>
                          <option value={3}>Cold</option>
                          <option value={4}>Very Hot</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label
                          htmlFor="filterStatus"
                          className="col-sm-12 col-form-label "
                        >
                          Filter By Status
                        </label>
                        <select
                          className="form-control"
                          multiple
                          data-live-search="true"
                          onChange={(e) => {
                            // filterStatus.push(e.target.value);
                            let value = Array.from(
                              e.target.selectedOptions,
                              (option) => option.value
                            );
                            setFilterStatus(value);
                          }}
                        >
                          <option value={0}>No Status</option>
                          <option value={1}>Closed</option>
                          <option value={2}>Waiting</option>
                          <option value={3}>DnD</option>
                          <option value={4}>Not Interested</option>
                          <option value={5}>Junk</option>
                          <option value={6}>Lost</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group ">
                        <label
                          htmlFor="productName"
                          className="col-sm-12 col-form-label "
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="productName"
                          className="form-control "
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group ">
                        <label
                          htmlFor="createDate"
                          className="col-sm-12 col-form-label "
                        >
                          Created Date
                        </label>
                        <input
                          type="date"
                          id="createDate"
                          className="form-control "
                          onChange={(e) => setCreateDate(e.target.value)}
                        />
                        <div className="form-check d-flex ml-3 mr-3 my-3">
                          <label
                            className="form-label"
                            htmlFor="createDateCheck"
                          >
                            Apply Created Date Filter
                          </label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="createDateCheck"
                            defaultChecked={createDateCheck ? true : false}
                            onChange={(e) => {
                              setCreateDateCheck(e.target.checked);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="form-group ">
                        <label htmlFor="" className="col-sm-12 col-form-label">
                          &nbsp;&nbsp;
                        </label>
                        <div className="col-sm-12">
                          <button className="btn btn-success " type="submit">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2 text-right">
                      <div className="form-group ">
                        <label htmlFor="" className="col-sm-12 col-form-label">
                          &nbsp;&nbsp;
                        </label>
                        <div className="col-sm-12">
                          <button
                            className="btn btn-secondary buttons-csv buttons-html5"
                            tabIndex="0"
                            aria-controls="example1"
                            type="button"
                            style={{ width: "130px" }}
                          >
                            <CSVLink
                              className="text-decoration-none"
                              data={rows_data_for_export}
                              headers={columns_data_for_export}
                              filename={"client_list.csv"}
                            >
                              <span className="text-light">Export to CSV</span>
                            </CSVLink>
                          </button>
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
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={refContainer}>
                  <DataTable
                    title="Client List"
                    customStyles={customStyles}
                    noDataComponent={
                      noRecords ? "There are no records to display" : ""
                    }
                    columns={columns}
                    data={temp_rows}
                    pagination
                    striped
                    noHeader
                    highlightOnHover
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default EnquiriesList;
