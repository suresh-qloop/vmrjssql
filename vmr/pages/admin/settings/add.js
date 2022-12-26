import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import notify from "../../../components/helpers/Notification";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import Link from "next/link";

const AddSetting = () => {
  const { data } = useSession();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (finalData) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/setting`, finalData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Setting Added Successfully");
        navigate.push("/admin/settings");
      })
      .catch(function (error) {
        console.log(error);
        notify("error", error.response.data.message);
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
                <h1>Create New Setting</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">New Setting</li>
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
                    <h3 className="card-title">Create New Setting</h3>
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
                              htmlFor="key"
                              className="col-sm-2 col-form-label"
                            >
                              Key
                            </label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.key ? "is-invalid" : ""
                                }`}
                                id="key"
                                placeholder="Key"
                                {...register("key", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.key && (
                                <div className="error invalid-feedback">
                                  <p>{errors.key.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label
                              htmlFor="value"
                              className="col-sm-2 col-form-label"
                            >
                              Value
                            </label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.value ? "is-invalid" : ""
                                }`}
                                id="value"
                                placeholder="Value"
                                {...register("value", {
                                  required: "This field is required",
                                })}
                              />
                              {errors.value && (
                                <div className="error invalid-feedback">
                                  <p>{errors.value.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-info">
                        Save
                      </button>
                      <Link
                        href="/admin/settings"
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

export default AddSetting;
