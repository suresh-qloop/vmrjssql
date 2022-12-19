import React from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../../../components/Admin/Header";
import Menu from "../../../../components/Admin/Menu";
import Footer from "../../../../components/Admin/Footer";
import notify from "../../../../components/helpers/Notification";

const ResetPassword = () => {
  const { data } = useSession();

  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (userData) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/user/reset/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Password Updated Successfully");
        router.push("/admin/dashboard");
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 401) {
          router.push("/unauthorized");
        }
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
                <h1>Reset Password</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Reset Password</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Reset Password</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="newPassword"
                          className="col-sm-2 col-form-label"
                        >
                          New Password
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="password"
                            className={`form-control ${
                              errors.newPassword ? "is-invalid" : ""
                            }`}
                            id="newPassword"
                            placeholder="New Password"
                            {...register("newPassword", {
                              required: "This field is required",
                              minLength: {
                                value: 6,
                                message: "Please enter at least 6 chars",
                              },
                            })}
                          />
                          {errors.newPassword && (
                            <div className="error invalid-feedback">
                              <p>{errors.newPassword.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="confirmPassword"
                          className="col-sm-4 col-form-label"
                        >
                          Confirm Password
                        </label>
                        <div className="col-sm-12">
                          <input
                            autoComplete="new-password"
                            type="password"
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            id="confirmPassword"
                            placeholder="Password"
                            {...register("confirmPassword", {
                              required: "This field is required",
                              minLength: {
                                value: 6,
                                message: "Please enter at least 6 chars",
                              },
                              validate: (value) => {
                                const { newPassword } = getValues();
                                return (
                                  newPassword === value ||
                                  "Password should match!"
                                );
                              },
                            })}
                          />
                          {errors.confirmPassword && (
                            <div className="error invalid-feedback">
                              <p>{errors.confirmPassword.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-info">
                        Save
                      </button>
                      <Link
                        href="/admin/users"
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

export default ResetPassword;
