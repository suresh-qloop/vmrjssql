import React, { useEffect } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import notify from "../../helpers/Notification";

const SeoReport = ({ preLoadedValues }) => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues, mode: "onChange" });

  const onSubmit = (reportData) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/seo-report/${id}`, reportData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Report Updated Successfully");
        router.push("/admin/seo_reports");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push("/unauthorized");
        }
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    // eslint-disable-next-line
  }, [status, id]);

  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update Report</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Update Report</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Update Report</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label
                              htmlFor="meta_name"
                              className="col-sm-4 col-form-label"
                            >
                              Meta Title
                            </label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.meta_name ? "is-invalid" : ""
                                }`}
                                id="meta_name"
                                placeholder="Meta Title"
                                {...register("meta_name", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.meta_name && (
                                <div className="error invalid-feedback">
                                  <p>{errors.meta_name.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label
                              htmlFor="meta_desc"
                              className="col-sm-4 col-form-label"
                            >
                              Meta Description
                            </label>
                            <div className="col-sm-12">
                              <textarea
                                type="text"
                                rows={5}
                                className={`form-control ${
                                  errors.meta_desc ? "is-invalid" : ""
                                }`}
                                id="meta_desc"
                                placeholder="Meta Description"
                                {...register("meta_desc", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.meta_desc && (
                                <div className="error invalid-feedback">
                                  <p>{errors.meta_desc.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label
                              htmlFor="meta_keywords"
                              className="col-sm-4 col-form-label"
                            >
                              Meta Keywords
                            </label>
                            <div className="col-sm-12">
                              <textarea
                                type="text"
                                rows={5}
                                className={`form-control ${
                                  errors.meta_keywords ? "is-invalid" : ""
                                }`}
                                id="meta_keywords"
                                placeholder="Meta Keywords"
                                {...register("meta_keywords", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.meta_keywords && (
                                <div className="error invalid-feedback">
                                  <p>{errors.meta_keywords.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-info">
                        Save & Back to List
                      </button>
                      <Link
                        href="/admin/seo_reports"
                        className="btn btn-default float-right"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
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

export default SeoReport;
