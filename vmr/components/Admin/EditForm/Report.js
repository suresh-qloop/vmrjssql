import React, { useState, useEffect, Fragment } from "react";

import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment/moment";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import notify from "../../helpers/Notification";
import { CKEditor } from "ckeditor4-react";
// import dynamic from "next/dynamic";

const Report = ({ preLoadedValues }) => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [categoryList, setCategoryList] = useState();
  const [TOC, setTOC] = useState(preLoadedValues.product_specification);
  const [description, setDescription] = useState(
    preLoadedValues.product_description
  );
  const [is_active, setIsActive] = useState(preLoadedValues.is_active);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues, mode: "onChange" });

  const SubmitAndEditFaqs = async (e) => {
    e.preventDefault();

    handleSubmit(async (reportData) => {
      reportData.product_specification = TOC;
      reportData.product_description = description;
      reportData.is_active = is_active;
      axios
        .put(`${process.env.NEXT_PUBLIC_NEXT_API}/report/${id}`, reportData, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          getCategoryList();
          notify("success", "Report Updated Successfully");
          router.push(`/admin/reports/addfaqs/${res.data.id}`);
        })
        .catch(function (error) {
          console.log(error);
          notify("error", error.response.data.error);
        });
    })();
  };

  const onSubmit = (reportData) => {
    reportData.product_specification = TOC;
    reportData.product_description = description;
    reportData.is_active = is_active;
    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/report/${id}`, reportData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Report Updated Successfully");
        router.push("/admin/reports");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          router.push("/unauthorized");
        }
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getCategoryList();
    // eslint-disable-next-line
  }, [status, id]);

  const getCategoryList = async () => {
    if (status === "authenticated") {
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

  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update Report</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Update Report</li>
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
                    <h3 className="card-title">Update Report</h3>
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
                                // defaultValue={data.name}
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
                        <div className="col-md-6 d-flex pt-5">
                          <div className="form-check d-flex ml-3 mr-3 ">
                            <label className=" form-label" htmlFor="is_set_toc">
                              Request TOC
                            </label>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="is_set_toc"
                              {...register("is_set_toc")}
                            />
                          </div>
                          <div className="form-check d-flex ml-3 mr-3 ">
                            <label className="form-label" htmlFor="is_active">
                              Make this Report Ready To Active
                            </label>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="is_active"
                              defaultChecked={is_active == 2 ? true : false}
                              // {...register("is_active")}
                              onChange={(e) => {
                                setIsActive(
                                  e.target.checked == true
                                    ? 2
                                    : preLoadedValues.is_active
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group ">
                            <label
                              htmlFor="TOC"
                              className="col-sm-2 col-form-label"
                            >
                              TOC
                            </label>
                            <div className="col-sm-12">
                              <CKEditor
                                initData={preLoadedValues.product_specification}
                                onChange={(evt) => {
                                  setTOC(evt.editor.getData());
                                }}
                                type="classic"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label
                              htmlFor="description"
                              className="col-sm-2 col-form-label"
                            >
                              Description
                            </label>
                            <div className="col-sm-12">
                              <CKEditor
                                initData={preLoadedValues.product_description}
                                onChange={(evt) => {
                                  setDescription(evt.editor.getData());
                                }}
                                type="classic"
                              />
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
                                type="text"
                                className={`form-control ${
                                  errors.price ? "is-invalid" : ""
                                }`}
                                id="price"
                                placeholder="Single User License"
                                {...register("price", {
                                  required: "This field is required",
                                  pattern: {
                                    value:
                                      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/i,
                                    message: "Not a Number",
                                  },
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
                                type="text"
                                className={`form-control ${
                                  errors.upto10 ? "is-invalid" : ""
                                }`}
                                id="upto10"
                                placeholder="Upto 10 Users License"
                                {...register("upto10", {
                                  required: "This field is required",
                                  pattern: {
                                    value:
                                      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/i,
                                    message: "Not a Number",
                                  },
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
                                type="text"
                                className={`form-control ${
                                  errors.corporate_price ? "is-invalid" : ""
                                }`}
                                id="corporate_price"
                                placeholder=" Corporate User License"
                                {...register("corporate_price", {
                                  required: "This field is required",
                                  pattern: {
                                    value:
                                      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/i,
                                    message: "Not a Number",
                                  },
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
                                type="text"
                                className={`form-control ${
                                  errors.data_pack_price ? "is-invalid" : ""
                                }`}
                                id="data_pack_price"
                                placeholder=" DataPack License"
                                {...register("data_pack_price", {
                                  required: "This field is required",
                                  pattern: {
                                    value:
                                      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/i,
                                    message: "Not a Number",
                                  },
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
                              <Controller
                                name="pub_date"
                                control={control}
                                defaultValue={preLoadedValues.pub_date}
                                rules={{
                                  required: "This field is required",
                                }}
                                render={({ field: { onChange, value } }) => (
                                  <input
                                    onChange={onChange}
                                    type="date"
                                    value={moment(value).format("YYYY-MM-DD")}
                                    className={`form-control ${
                                      errors.pub_date ? "is-invalid" : ""
                                    }`}
                                    id="pub_date"
                                    placeholder="Publish Date"
                                  />
                                )}
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
                              className=" form-label"
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
                              htmlFor="share_with_reseller"
                            >
                              Share with reseller?
                            </label>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="share_with_reseller"
                              {...register("share_with_reseller")}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <Controller
                              name="category_id"
                              control={control}
                              defaultValue={preLoadedValues.category_id}
                              rules={{
                                required: "This field is required",
                              }}
                              render={({ field: { onChange, value } }) => (
                                <>
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
                                      value={value}
                                      onChange={onChange}
                                      id="category_id"
                                    >
                                      {categoryList?.map((curElem, i) => {
                                        return (
                                          <Fragment key={i + 1}>
                                            <option
                                              key={curElem.id}
                                              value={curElem.id}
                                              // selected={
                                              //   curElem.id ==
                                              //   preLoadedValues.category_id
                                              // }
                                              className="optionGroup"
                                            >
                                              {curElem.name}
                                            </option>
                                            {curElem.children.map((Elem) => {
                                              return (
                                                <option
                                                  key={Elem.id}
                                                  // selected={
                                                  //   Elem.id ==
                                                  //   preLoadedValues.category_id
                                                  // }
                                                  className="optionChild"
                                                  value={Elem.id}
                                                >
                                                  {Elem.name}
                                                </option>
                                              );
                                            })}
                                          </Fragment>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </>
                              )}
                            />
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

                        <div className="col-md-6">
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
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label
                              htmlFor="reference_url"
                              className="col-sm-4 col-form-label"
                            >
                              Reference URL
                            </label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.reference_url ? "is-invalid" : ""
                                }`}
                                id="reference_url"
                                placeholder="Reference URL"
                                {...register("reference_url")}
                              />
                              {errors.reference_url && (
                                <div className="error invalid-feedback">
                                  <p>{errors.reference_url.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        type="button"
                        className="btn btn-success mr-3"
                        onClick={SubmitAndEditFaqs}
                      >
                        Save & Edit FAQs
                      </button>
                      <button type="submit" className="btn btn-info">
                        Save & Back to List
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
  );
};

export default Report;
