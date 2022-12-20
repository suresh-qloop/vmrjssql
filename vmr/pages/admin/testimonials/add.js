import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import notify from "../../../components/helpers/Notification";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const AddTestimonial = () => {
  const { data } = useSession();
  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (testimonialData) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NEXT_API}/testimonial`,
        testimonialData,
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        notify("success", "Testimonial Added Successfully");
        navigate.push("/admin/testimonials");
      })
      .catch(function (error) {
        console.log(error);
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
                <h1>Create New Testimonial</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">New Testimonial</li>
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
                    <h3 className="card-title">Create Testimonial</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="testimonial_title"
                          className="col-sm-4 col-form-label"
                        >
                          Testimonial Title
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.testimonial_title ? "is-invalid" : ""
                            }`}
                            id="testimonial_title"
                            placeholder="Testimonial Title"
                            {...register("testimonial_title", {
                              required: "This field is required",
                            })}
                          />
                          {errors.testimonial_title && (
                            <div className="error invalid-feedback">
                              <p>{errors.testimonial_title.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="testimonial_description"
                          className="col-sm-4 col-form-label"
                        >
                          Testimonial Description
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.testimonial_description ? "is-invalid" : ""
                            }`}
                            id="testimonial_description"
                            placeholder="Testimonial Description"
                            {...register("testimonial_description", {
                              required: "This field is required",
                            })}
                          />
                          {errors.testimonial_description && (
                            <div className="error invalid-feedback">
                              <p>{errors.testimonial_description.message}</p>
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
                        href="/admin/testimonials"
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

export default AddTestimonial;
