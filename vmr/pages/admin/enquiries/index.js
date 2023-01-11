import React, { useEffect, useState, useRef, Fragment } from "react";

import DataTable from "react-data-table-component";
import "jspdf-autotable";
import axios from "axios";
import Link from "next/link";
import { CSVLink } from "react-csv";
import { useSession } from "next-auth/react";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";

const EnquiriesList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();

  const [enquirieData, setEnquirieData] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

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
  const e_status = (enquirie) => {
    return enquirie.status;
  };
  const rating = (enquirie) => {
    return enquirie.rating;
  };
  const message = (enquirie) => {
    return enquirie.message;
  };
  // const remark = (enquirie) => {
  //   return enquirie.remark;
  // };

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
      selector: e_status,
      sortable: true,
      width: "150px",
      cell: (enquirie) => (
        <Fragment>
          {/* {enquirie.status === 0 && <div className="text-sm">No Status</div>}
          {enquirie.status === 1 && <div className="text-sm">Closed</div>}
          {enquirie.status === 2 && <div className="text-sm">Waiting</div>}
          {enquirie.status === 3 && <div className="text-sm">DnD</div>}
          {enquirie.status === 4 && (
            <div className="text-sm">Not Interested</div>
          )}
          {enquirie.status === 5 && <div className="text-sm">Junk</div>}
          {enquirie.status === 6 && <div className="text-sm">Lost</div>} */}

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
          {/* {enquirie.rating === 0 && <div>No Status</div>}
          {enquirie.rating === 1 && <div>Hot</div>}
          {enquirie.rating === 2 && <div>Warm</div>}
          {enquirie.rating === 3 && <div>Cold</div>}
          {enquirie.rating === 4 && <div>Very Hot</div>} */}

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
    // {
    //   name: "Remark",
    //   selector: remark,
    //   sortable: true,
    //   width: "140px",
    // },
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
  ];

  // useEffect(() => {
  const temp_rows = enquirieData.filter(
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

  useEffect(() => {
    getEnquirieData();
    // eslint-disable-next-line
  }, [status]);

  const getEnquirieData = async () => {
    if (status === "authenticated") {
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
                <div className="row my-3">
                  <div className="col-md-8 col-sm-8  text-left">
                    {/* <Link
                      href="/admin/clients/add"
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary mb-2"
                    >
                      Add Enquirie
                    </Link> */}
                  </div>
                  <div className="col-md-3 col-sm-3 text-right">
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
