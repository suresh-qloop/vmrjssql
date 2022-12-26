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

const Setting = ({ preLoadedValues }) => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues });

  const onSubmit = (finalData) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/setting/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Settings Updated Successfully");
        router.push("/admin/settings");
      })
      .catch((error) => {
        console.log(error);
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
                <h1>Update Setting</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Update Setting</li>
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
                    <h3 className="card-title">Update Setting</h3>
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

export default Setting;
