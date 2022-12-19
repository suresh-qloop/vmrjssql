import React, { useState, useEffect, Fragment, useRef } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import JoditEditor from "jodit-react";
import dynamic from "next/dynamic";
const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const AddReport = () => {
  const { status, data } = useSession();
  const navigate = useRouter();

  const [categoryList, setCategoryList] = useState();

  const [TOC, setTOC] = useState(null);
  const [tocError, setTocError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [description, setDescription] = useState(null);
  const tocEditor = useRef(null);
  const descriptionEditor = useRef(null);
  //   const [imageURL, setImage] = useState(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetToc = (value) => {
    setTOC(value);

    if (TOC === "" || TOC === "<p><br></p>") {
      setTocError(true);
    } else {
      setTocError(false);
    }
  };

  const handleSetDescription = (value) => {
    setDescription(value);

    if (description === "" || description === "<p><br></p>") {
      setDescError(true);
    } else {
      setDescError(false);
    }
  };

  useEffect(() => {
    getCategoryList();
    // eslint-disable-next-line
  }, [status]);

  const getCategoryList = async () => {
    if (!(status === "loading")) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/category/drop-list`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setCategoryList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
    if (TOC === "<p><br></p>" || TOC === "" || description === null) {
      setTocError(true);
      return;
    }
    if (
      description === "<p><br></p>" ||
      description === "" ||
      description === null
    ) {
      setDescError(true);
      return;
    }

    const finalData = { ...reportData, TOC, description };

    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/report/`, finalData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        getCategoryList();
        notify("success", "Report Created Successfully");
        navigate.push("/admin/reports");
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
                  <h1>Create New Report</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link href="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">New Report</li>
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
                      <h3 className="card-title">Create New Report</h3>
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
                                htmlFor="product_name"
                                className="col-sm-2 col-form-label"
                              >
                                Name
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.product_name ? "is-invalid" : ""
                                  }`}
                                  id="product_name"
                                  placeholder="Name"
                                  {...register("product_name", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.product_name && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.product_name.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="alias"
                                className="col-sm-2 col-form-label"
                              >
                                Alias
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.alias ? "is-invalid" : ""
                                  }`}
                                  id="alias"
                                  placeholder="Alias"
                                  {...register("alias", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.alias && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.alias.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="publisher_name"
                                className="col-sm-4 col-form-label"
                              >
                                Publisher Name
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.publisher_name ? "is-invalid" : ""
                                  }`}
                                  id="publisher_name"
                                  placeholder="Publisher Name"
                                  {...register("publisher_name", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.publisher_name && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.publisher_name.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 pt-5">
                            <div className="form-check d-flex ml-3 mr-3 ">
                              <label
                                className=" form-label"
                                htmlFor="is_set_toc"
                              >
                                Request TOC
                              </label>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="is_set_toc"
                                {...register("is_set_toc")}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="TOC"
                                className="col-sm-2 col-form-label"
                              >
                                TOC
                              </label>
                              <div className="col-sm-12">
                                <JoditEditor
                                  ref={tocEditor}
                                  value={TOC}
                                  height="600px"
                                  config={config}
                                  tabIndex={1}
                                  onBlur={handleSetToc}
                                  // {...register("content")}
                                  required
                                />
                                {tocError && (
                                  <div className="error text-danger text-sm">
                                    <p>This field is required</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="description"
                                className="col-sm-2 col-form-label"
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
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="price"
                                className="col-sm-4 col-form-label"
                              >
                                Single User License
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="number"
                                  step="0.01"
                                  className={`form-control ${
                                    errors.price ? "is-invalid" : ""
                                  }`}
                                  id="price"
                                  placeholder="Single User License"
                                  {...register("price", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.price && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.price.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="upto10"
                                className="col-sm-4 col-form-label"
                              >
                                Upto 10 Users License
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="number"
                                  step="0.01"
                                  className={`form-control ${
                                    errors.upto10 ? "is-invalid" : ""
                                  }`}
                                  id="upto10"
                                  placeholder="Upto 10 Users License"
                                  {...register("upto10", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.upto10 && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.upto10.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="corporate_price"
                                className="col-sm-4 col-form-label"
                              >
                                Corporate User License
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="number"
                                  step="0.01"
                                  className={`form-control ${
                                    errors.corporate_price ? "is-invalid" : ""
                                  }`}
                                  id="corporate_price"
                                  placeholder="Corporate User License"
                                  {...register("corporate_price", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.corporate_price && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.corporate_price.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="data_pack_price"
                                className="col-sm-4 col-form-label"
                              >
                                DataPack License
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="number"
                                  step="0.01"
                                  className={`form-control ${
                                    errors.data_pack_price ? "is-invalid" : ""
                                  }`}
                                  id="data_pack_price"
                                  placeholder=" DataPack License"
                                  {...register("data_pack_price", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.data_pack_price && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.data_pack_price.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="pub_date"
                                className="col-sm-4 col-form-label"
                              >
                                Publish Date
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="date"
                                  className={`form-control ${
                                    errors.pub_date ? "is-invalid" : ""
                                  }`}
                                  id="pub_date"
                                  placeholder="Publish Date"
                                  {...register("pub_date", {
                                    required: "This field is required",
                                  })}
                                />
                                {errors.pub_date && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.pub_date.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 d-flex pt-5">
                            <div className="form-check d-flex ml-3 mr-3 ">
                              <label
                                className="form-label"
                                htmlFor="is_upcoming"
                              >
                                Is Upcoming Report
                              </label>
                              <input
                                type="checkbox"
                                className={`form-check-input ${
                                  errors.is_upcoming ? "is-invalid" : ""
                                }`}
                                id="is_upcoming"
                                {...register("is_upcoming")}
                              />
                            </div>
                            <div className="form-check d-flex ml-3 mr-3 ">
                              <label
                                className=" form-label"
                                htmlFor="shareWithReseller"
                              >
                                Share with reseller?
                              </label>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="shareWithReseller"
                                {...register("shareWithReseller")}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group ">
                              <label
                                htmlFor="category_id"
                                className="col-sm-4 col-form-label"
                              >
                                Choose Category
                              </label>
                              <div className="col-sm-12">
                                <select
                                  as="select"
                                  className={`form-control ${
                                    errors.category_id ? "is-invalid" : ""
                                  }`}
                                  id="category_id"
                                  {...register("category_id", {
                                    required: "This field is required",
                                  })}
                                >
                                  <option hidden value="">
                                    Select Category
                                  </option>
                                  {categoryList?.map((curElem, i) => {
                                    return (
                                      <Fragment key={i + 1}>
                                        <option
                                          key={curElem.id}
                                          value={curElem.id}
                                          className="optionGroup"
                                        >
                                          {curElem.name}
                                        </option>
                                        {curElem.children.map((Elem) => {
                                          return (
                                            <option
                                              key={Elem.id}
                                              className="optionChild"
                                              value={Elem.id}
                                            >
                                              {Elem.category_name}
                                            </option>
                                          );
                                        })}
                                      </Fragment>
                                    );
                                  })}
                                </select>
                                {errors.category_id && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.category_id.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
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
                          Save
                        </button>
                        <Link
                          href="/admin/reports"
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

export default AddReport;
