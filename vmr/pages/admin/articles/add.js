import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CKEditor } from "ckeditor4-react";
import dynamic from "next/dynamic";
// const importJodit = () => import("jodit-react");

// const JoditEditor = dynamic(importJodit, {
//   ssr: false,
// });

const AddArticle = () => {
  const { data } = useSession();
  const navigate = useRouter();

  // const [descError, setDescError] = useState(false);
  const [description, setDescription] = useState("");
  // const descriptionEditor = useRef(null);
  //   const [imageURL, setImage] = useState(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleSetDescription = (value) => {
  //   setDescription(value);

  //   if (description === "" || description === "<p><br></p>") {
  //     setDescError(true);
  //   } else {
  //     setDescError(false);
  //   }
  // };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ mode: "onChange" });

  const config = {
    allowResizeX: false,
    allowResizeY: false,
    height: "400",
  };

  const onSubmit = (reportData) => {
    // if (
    //   description === "<p><br></p>" ||
    //   description === "" ||
    //   description === null
    // ) {
    //   setDescError(true);
    //   return;
    // }

    const finalData = { ...reportData, description };

    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/article/`, finalData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Article Created Successfully");
        navigate.push("/admin/articles");
      })
      .catch(function (error) {
        console.log(error);
        // notifyEmail(error.response.data.message);
      });
  };
  return (
    mounted && (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Create New Article</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">New Article</li>
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
                      <h3 className="card-title">Create New Article</h3>
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
                              {/* <JoditEditor
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
                              )} */}
                              <CKEditor
                                initData={description}
                                onChange={(evt) => {
                                  setDescription(evt.editor.getData());
                                }}
                                type="classic"
                              />
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
                            htmlFor="article_type"
                            className="col-sm-2 col-form-label"
                          >
                            Article Type
                          </label>
                          <div className="col-sm-12">
                            <select
                              className={`form-control ${
                                errors.article_type ? "is-invalid" : ""
                              }`}
                              id="article_type"
                              {...register("article_type", {
                                required: "This field is required",
                              })}
                            >
                              <option value="" selected disabled hidden>
                                Choose here
                              </option>
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
    )
  );
};

export default AddArticle;
