import React, { useEffect, useState, useRef, Fragment } from "react";

import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import Header from "../../../../components/Admin/Header";
import Menu from "../../../../components/Admin/Menu";
import Footer from "../../../../components/Admin/Footer";
import notify from "../../../../components/helpers/Notification";

const ChildrenCategoryList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();
  const [catData, setCatData] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const name = (category) => {
    return category.name;
  };

  const catStatus = (category) => {
    return category.status;
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

      cell: (category) => <div>{category.name}</div>,
    },
    {
      name: "Status",
      selector: catStatus,
      sortable: true,
      width: "130px",
      cell: (category) => (
        <Fragment>
          {category.status === 1 && (
            <span className="badge bg-success ">Active</span>
          )}
          {category.status === 0 && (
            <span className="badge  bg-warning">Inactive</span>
          )}
        </Fragment>
      ),
    },
    {
      name: "Action",
      button: true,
      grow: 1,
      width: "380px",
      cell: (category) => (
        <div>
          <Link href={`/admin/categories/edit/${category.id}`}>
            <button
              type="button"
              style={{ marginRight: "5px" }}
              className="btn btn-sm btn-outline-info mr-2"
            >
              Edit
            </button>
          </Link>

          {category.status === 1 ? (
            <button
              type="button"
              onClick={() => {
                statusHandler(category.id);
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
                statusHandler(category.id);
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
              deleteCategory(category.id);
            }}
            className="btn btn-sm btn-outline-danger mr-2"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = catData.filter(
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
    getReportCategoryData();
    // eslint-disable-next-line
  }, [status]);

  const getReportCategoryData = async () => {
    if (status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/category/child/${id}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setCatData(res.data);
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

  const deleteCategory = (id) => {
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
          .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/category/${id}`, {
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          })
          .then((res) => {
            getReportCategoryData();
            notify("success", "User Deleted Successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const statusHandler = async (id) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/category/status/${id}`, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        getReportCategoryData();
        notify("success", "Status Updated Successfully");
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
                <h1>Level 2 Categories</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Level 2 Categories</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Level 2 Categories</h3>
            </div>
            <div className="card-body">
              <div
                id="example1_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row my-3">
                  <div className="col-md-8 col-sm-8  text-left">
                    <Link
                      href={`/admin/categories/children/add/${id}`}
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary mb-2"
                    >
                      Add Children Category
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
                {noRecords ? (
                  <div>There are no records to display</div>
                ) : (
                  <div ref={refContainer}>
                    <DataTable
                      title="Client List"
                      customStyles={customStyles}
                      // noDataComponent={
                      //   noRecords ? "There are no records to display" : ""
                      // }
                      columns={columns}
                      data={temp_rows}
                      pagination
                      striped
                      noHeader
                      highlightOnHover
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ChildrenCategoryList;
