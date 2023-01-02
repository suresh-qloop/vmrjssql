import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment/moment";
// import { currencyInrFormat } from "../../../../utils/utils";
import { currencyInrFormat } from "../../../../utils/currencyInrFormat";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import notify from "../../../../components/helpers/Notification";
import Header from "../../../../components/Admin/Header";
import Menu from "../../../../components/Admin/Menu";
import Footer from "../../../../components/Admin/Footer";

const ViewReport = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    getEditData();
    // eslint-disable-next-line
  }, [status, id]);

  const getEditData = async () => {
    if (status === "authenticated") {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/report/view/${id}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setReportData(res.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            router.push("/unauthorized");
          }
        });
    }
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
            getEditData();
            notify("success", "Report Deleted Successfully");
            router.push("/admin/reports");
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
      .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/report/status/${id}`, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        getEditData();
        notify("success", "Status Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return reportData ? (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>View Report</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">View Report</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">View Report</h3>
                  </div>
                  <div className="card-body">
                    <h3>{reportData.product_name}</h3>
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <p>
                          <strong> status: </strong> &nbsp;&nbsp;
                          <Fragment>
                            {reportData.is_active === 1 && (
                              <span className="badge bg-success ">Active</span>
                            )}

                            {reportData.is_active === 0 && (
                              <span className="badge  bg-warning">
                                Inactive
                              </span>
                            )}
                          </Fragment>
                        </p>

                        <p>
                          <strong>Single User License($):</strong> &nbsp;&nbsp;
                          <span className="text-success">
                            {currencyInrFormat(reportData.price)}
                          </span>
                        </p>
                        <p>
                          <strong>Upto 10 Users License($):</strong>
                          &nbsp;&nbsp;
                          <span className="text-success">
                            {currencyInrFormat(reportData.upto10)}
                          </span>
                        </p>
                        <p>
                          <strong>Corporate User License($):</strong>
                          &nbsp;&nbsp;
                          <span className="text-success">
                            {currencyInrFormat(reportData.corporate_price)}
                          </span>
                        </p>
                        <p>
                          <strong>DataPack License($):</strong> &nbsp;&nbsp;
                          <span className="text-success">
                            {currencyInrFormat(reportData.data_pack_price)}
                          </span>
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong> Published Date: </strong> &nbsp;&nbsp;
                          <span className=" ">
                            {moment(reportData.pub_date).format(
                              "YYYY-MM-D H:MM:SS"
                            )}
                          </span>
                        </p>

                        <p>
                          <strong> Last Updated: </strong> &nbsp;&nbsp;
                          <span className=" ">
                            {moment(reportData.modified).format(
                              "YYYY-MM-D H:MM:SS"
                            )}
                          </span>
                        </p>
                        <p>
                          <strong> Created: </strong> &nbsp;&nbsp;
                          <span className=" ">
                            {moment(reportData.created).format(
                              "YYYY-MM-D H:MM:SS"
                            )}
                          </span>
                        </p>
                        <p>
                          <strong>Category:</strong>
                          &nbsp;&nbsp;
                          <span className="">{reportData.category_name}</span>
                        </p>
                      </div>
                    </div>
                    <h5 className="my-4">Description:</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: reportData.product_description,
                      }}
                    ></div>
                    <h5 className="my-4">Table Of Content:</h5>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: reportData.product_specification,
                      }}
                    ></div>
                    <h4>Related News:</h4>
                    <h5>Tags: </h5>
                    <p>
                      <strong> Meta Title:</strong> &nbsp; &nbsp;
                      <span>{reportData.meta_name}</span>
                    </p>
                    <p>
                      <strong>Meta Keywords:</strong> &nbsp; &nbsp;
                      <span>{reportData.meta_keywords}</span>
                    </p>
                    <p>
                      <strong>Meta Description:</strong> &nbsp; &nbsp;
                      <span>{reportData.metaDescription}</span>
                    </p>
                    <p>
                      <strong>Publisher Name:</strong> &nbsp; &nbsp;
                      <span>{reportData.publisher_name}</span>
                    </p>
                  </div>

                  <div className="card-footer"></div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Action</h3>
                  </div>
                  <div className="card-body">
                    <div>
                      <Link
                        href={`/admin/reports/edit/${id}`}
                        style={{ marginRight: "5px" }}
                        className="btn btn-sm btn-outline-info mr-2"
                      >
                        Edit
                      </Link>

                      {reportData.is_active === 1 ? (
                        <button
                          type="button"
                          onClick={() => {
                            statusHandler(id);
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
                            statusHandler(id);
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
                          deleteReport(id);
                        }}
                        className="btn btn-sm btn-outline-danger mr-2"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/admin/reports/addfaqs/${id}`}
                        style={{ marginRight: "5px" }}
                        className="btn btn-sm btn-outline-primary mr-2"
                      >
                        FAQs
                      </Link>
                    </div>
                  </div>
                  <div className="card-footer"></div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Report Image</h3>
                  </div>
                  <div className="card-body text-center">
                    <img src={reportData.imageURL} alt="" width={100} />
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="text-center m-5 p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default ViewReport;
