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

const TestimonialForm = ({ preLoadedValues }) => {
  const { data } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues });

  const onSubmit = (testimonialData) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_NEXT_API}/testimonial/${id}`,
        testimonialData,
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        notify("success", "testimonial Updated Successfully");
        router.push("/admin/testimonials");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          router.push("/unauthorized");
        }
      });
  };

  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Edit Testimonial Information</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Testimonial</li>
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
                    <h3 className="card-title">Edit Testimonial Information</h3>
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

export default TestimonialForm;
