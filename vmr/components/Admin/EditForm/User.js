import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import notify from "../../helpers/Notification";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

const User = ({ preLoadedValues }) => {
  const { data } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues });

  const onSubmit = (userData) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/user/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "User Updated Successfully");
        router.push("/admin/users");
      })
      .catch((error) => {
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
                <h1>Edit User Information</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit User</li>
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
                    <h3 className="card-title">Edit User Information</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="first_name"
                          className="col-sm-2 col-form-label"
                        >
                          First Name
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.first_name ? "is-invalid" : ""
                            }`}
                            id="firstName"
                            placeholder="First Name"
                            {...register("first_name", {
                              required: "This field is required",
                            })}
                          />
                          {errors.first_name && (
                            <div className="error invalid-feedback">
                              <p>{errors.first_name.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="last_name"
                          className="col-sm-2 col-form-label"
                        >
                          Last Name
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.last_name ? "is-invalid" : ""
                            }`}
                            id="lastName"
                            placeholder="Last Name"
                            {...register("last_name", {
                              required: "This field is required",
                            })}
                          />
                          {errors.last_name && (
                            <div className="error invalid-feedback">
                              <p>{errors.last_name.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="email"
                          className="col-sm-2 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="email"
                            disabled
                            className={`form-control ${
                              errors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                              required: "This field is required",
                            })}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              <p>{errors.email.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="password"
                          className="col-sm-2 col-form-label"
                        >
                          Password
                        </label>
                        <div className="col-sm-12">
                          <input
                            autoComplete="new-password"
                            type="password"
                            className={`form-control ${
                              errors.password ? "is-invalid" : ""
                            }`}
                            id="password"
                            placeholder="Password"
                            {...register("password", {
                              minLength: {
                                value: 6,
                                message: "Please enter at least 6 chars",
                              },
                            })}
                          />
                          {errors.password && (
                            <div className="error invalid-feedback">
                              <p>{errors.password.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="role"
                          className="col-sm-2 col-form-label"
                        >
                          Role
                        </label>
                        <div className="col-sm-12">
                          <select
                            className={`form-control ${
                              errors.role ? "is-invalid" : ""
                            }`}
                            id="role"
                            {...register("role", {
                              required: "This field is required",
                            })}
                          >
                            <option value={1}>Super Admin</option>
                            <option value={2}>Analyst</option>
                            <option value={2}>SEO</option>
                            <option value={2}>Content</option>
                            <option value={2}>Jr Analyst</option>
                            <option value={2}>User</option>
                            <option value={2}>Sales Team</option>
                          </select>
                          {errors.role && (
                            <div className="error invalid-feedback">
                              <p>{errors.role.message}</p>
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

export default User;
