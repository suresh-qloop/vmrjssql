import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import notify from "../../helpers/Notification";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const Article = ({ preLoadedValues }) => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [descError, setDescError] = useState(false);
  const [description, setDescription] = useState(null);
  const descriptionEditor = useRef(null);

  const config = {
    allowResizeX: false,
    allowResizeY: false,
    height: "400",
  };

  const handleSetDescription = (value) => {
    setDescription(value);
    if (description === "" || description === "<p><br></p>") {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

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
    if (
      description === "<p><br></p>" ||
      description === "" ||
      description === null
    ) {
      setDescError(true);
      return;
    }
    reportData.description = description;
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/article/${id}`, reportData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "User Updated Successfully");
        router.push("/admin/articles");
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
                      <div className="col-md-12">
                        <div className="form-group ">
                          <label
                            htmlFor="headline"
                            className="col-sm-2 col-form-label"
                          >
                            Headline
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.headline ? "is-invalid" : ""
                              }`}
                              id="headline"
                              placeholder="Headline"
                              {...register("headline", {
                                required: "This field is required",
                              })}
                            />
                            {errors.headline && (
                              <div className="error invalid-feedback">
                                <p>{errors.headline.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group ">
                          <label
                            htmlFor="description"
                            className="col-sm-4 col-form-label"
                          >
                            Description
                          </label>
                          <div className="col-sm-12">
                            <JoditEditor
                              ref={descriptionEditor}
                              value={description}
                              config={config}
                              tabIndex={1}
                              onBlur={handleSetDescription}
                            />
                            {descError && (
                              <div className="error text-danger text-sm">
                                <p>This field is required</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

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
                      <div className="form-group ">
                        <label
                          htmlFor="article_type"
                          className="col-sm-2 col-form-label"
                        >
                          Article Type
                        </label>
                        <div className="col-sm-12">
                          <select
                            defaultValue={preLoadedValues.article_type}
                            className={`form-control ${
                              errors.article_type ? "is-invalid" : ""
                            }`}
                            id="article_type"
                            {...register("article_type", {
                              required: "This field is required",
                            })}
                          >
                            <option value="analysis">analysis</option>
                            <option value="press-releases">
                              press-releases
                            </option>
                          </select>
                          {errors.article_type && (
                            <div className="error invalid-feedback">
                              <p>{errors.article_type.message}</p>
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

export default Article;
