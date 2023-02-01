import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import notify from "../../helpers/Notification";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";

const SeoArticle = ({ preLoadedValues }) => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [description, setDescription] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues });

  useEffect(() => {
    if (!id) {
      return;
    }
    setDescription(preLoadedValues.description);

    // eslint-disable-next-line
  }, [status, id]);

  const onSubmit = (reportData) => {
    reportData.description = description;
    axios
      .put(
        `${process.env.NEXT_PUBLIC_NEXT_API}/seo-article/${id}`,
        reportData,
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        notify("success", "Article Updated Successfully");
        router.push("/admin/seo_articles");
      })
      .catch((error) => {
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
                <h1>Edit Article Information</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Article</li>
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
                    <h3 className="card-title">Edit Article Information</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="meta_title"
                          className="col-sm-2 col-form-label"
                        >
                          Meta Title
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.meta_title ? "is-invalid" : ""
                            }`}
                            id="meta_title"
                            placeholder="Meta Title"
                            {...register("meta_title", {
                              required: "This field is required",
                            })}
                          />
                          {errors.meta_title && (
                            <div className="error invalid-feedback">
                              <p>{errors.meta_title.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="meta_desc"
                          className="col-sm-2 col-form-label"
                        >
                          Meta Description
                        </label>
                        <div className="col-sm-12">
                          <textarea
                            type="text"
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
                      <div className="form-group ">
                        <label
                          htmlFor="meta_keywords"
                          className="col-sm-2 col-form-label"
                        >
                          Meta Keywords
                        </label>
                        <div className="col-sm-12">
                          <textarea
                            type="text"
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
                      <div className="form-group ">
                        <label
                          htmlFor="slug"
                          className="col-sm-2 col-form-label"
                        >
                          Slug
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.slug ? "is-invalid" : ""
                            }`}
                            id="slug"
                            placeholder="Slug"
                            {...register("slug", {
                              required: "This field is required",
                            })}
                          />
                          {errors.slug && (
                            <div className="error invalid-feedback">
                              <p>{errors.slug.message}</p>
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
                        href="/admin/seo_articles"
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

export default SeoArticle;
