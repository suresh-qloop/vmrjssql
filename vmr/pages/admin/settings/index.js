import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";

const SettingList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();
  const [settingData, setSettingData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

  const key = (setting) => {
    return setting.key;
  };

  const value = (setting) => {
    return setting.value;
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
      name: "Key",
      selector: key,
      sortable: true,
    },
    {
      name: "Value",
      selector: value,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      grow: 1,

      cell: (setting) => (
        <div>
          <Link
            href={`/admin/settings/edit/${setting.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-info mr-2"
          >
            Edit
          </Link>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = settingData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );

  useEffect(() => {
    getSettingData();
    // eslint-disable-next-line
  }, [status]);

  const getSettingData = async () => {
    if (status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/setting`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setSettingData(res.data);
          setLoading(false);
          if (settingData.length < 0) {
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
                <h1>Setting List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Setting List</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Setting List</h3>
            </div>
            <div className="card-body">
              <div
                id="example1_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row my-3">
                  <div className="col-md-9 col-sm-9">
                    <Link
                      href="/admin/settings/add"
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary mb-2"
                    >
                      Add Setting
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
                </div>
                {loading && (
                  <div className="row my-3">
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
      </div>
      <Footer />
    </div>
  );
};

export default SettingList;
