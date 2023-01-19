import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../components/Frontend/Navbar";
import NavbarTop from "../../../components/Frontend/NavbarTop";
import Footer from "../../../components/Frontend/Footer";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";
import notify from "../../../components/helpers/Notification";
import Link from "next/link";
import { currencyInrFormat } from "../../../utils/currencyInrFormat";

const AskQuestions = () => {
  const [reportData, setReportData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);

  const router = useRouter();
  console.log(router);
  const { slug, singleUser, upTo10User, corporateUser, datapack } =
    router.query;
  console.log(datapack);
  const handleCaptcha = async (value) => {
    setIsVerified(true);
  };

  const getReportData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/report/${slug}`)
      .then((res) => {
        setReportData(res.data);
        setName(res.data.product_name);
        setDescription(res.data.product_description);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!slug) {
      return;
    }
    if (slug === "undefined") {
      return;
    }
    getReportData();
  }, [slug]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // data.report = reportData.product_name;
    // data.publisher_name = reportData.publisher_name;
    // data.slug = reportData.slug;
    // data.price = reportData.price;
    // data.product_id = reportData.id;
    // data.alias = reportData.alias;
    // const finalData = {
    //   ...data,
    //   mobile,
    // };
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_NEXT_API}/front/req-email`, finalData)
    //   // .then((res) => {
    //   // notify("success", "Form Submitted Successfully");
    //   // router.push("/");
    //   // })
    //   .catch(function (error) {
    //     console.log(error);
    //     notify("error", error.response.data.message);
    //   });
  };

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content={reportData.meta_keywords} />
        <meta name="description" content={reportData.meta_desc}></meta>

        <title>{reportData.meta_name}</title>
      </Head>
      <NavbarTop />
      <Navbar />

      <div className=" bg-light py-3">
        <div className="container bg-white p-4 px-2">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card">
                <div className="card-body">
                  <p className="text-center text-info">{reportData.alias}</p>
                  <h3 className="text-center mb-3">
                    <b> Buy Now</b>
                  </h3>
                  <hr />
                  <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row text-sm">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value=""
                              name="todo1"
                              id="todoCheck1"
                              // onChange={(e) => {
                              //   setSingleUser(e.target.checked);
                              // }}
                              defaultChecked={
                                singleUser == "true" ? true : false
                              }
                            />
                            <label
                              htmlFor="todoCheck1"
                              className="form-check-label "
                            >
                              Single User License:&nbsp;
                              <span>
                                {reportData.price
                                  ? currencyInrFormat(reportData.price)
                                  : ""}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value=""
                              name="todo1"
                              id="todoCheck2"
                              // onChange={(e) => {
                              //   setUpTo10User(e.target.checked);
                              // }}
                              defaultChecked={
                                upTo10User == "true" ? true : false
                              }
                            />
                            <label
                              htmlFor="todoCheck2"
                              className="form-check-label "
                            >
                              Upto 10 Users License:&nbsp;
                              <span>
                                {reportData.upto10
                                  ? currencyInrFormat(reportData.upto10)
                                  : ""}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value=""
                              name="todo1"
                              id="todoCheck3"
                              // onChange={(e) => {
                              //   setCorporateUser(e.target.checked);
                              // }}
                              defaultChecked={
                                corporateUser == "true" ? true : false
                              }
                            />
                            <label
                              htmlFor="todoCheck3"
                              className="form-check-label "
                            >
                              Corporate User License:&nbsp;
                              <span>
                                {reportData.corporate_price
                                  ? currencyInrFormat(
                                      reportData.corporate_price
                                    )
                                  : ""}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="todo1"
                              id="todoCheck4"
                              // onChange={(e) => {
                              //   setDatapack(e.target.checked);
                              // }}
                              defaultChecked={datapack == "true" ? true : false}
                            />
                            <label
                              htmlFor="todoCheck4"
                              className="form-check-label "
                            >
                              DataPack License:&nbsp;
                              <span>
                                {reportData.data_pack_price
                                  ? currencyInrFormat(
                                      reportData.data_pack_price
                                    )
                                  : ""}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="first_name"
                            className="col-sm-4 col-form-label"
                          >
                            First Name
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.first_name ? "is-invalid" : ""
                              }`}
                              id="first_name"
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="last_name"
                            className="col-sm-4 col-form-label"
                          >
                            Last Name
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.last_name ? "is-invalid" : ""
                              }`}
                              id="last_name"
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
                      </div>

                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="organisation"
                            className="col-sm-4 col-form-label"
                          >
                            Organisation
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.organisation ? "is-invalid" : ""
                              }`}
                              id="organisation"
                              placeholder="Organisation"
                              {...register("organisation", {
                                required: "This field is required",
                              })}
                            />
                            {errors.organisation && (
                              <div className="error invalid-feedback">
                                <p>{errors.organisation.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="designation"
                            className="col-sm-4 col-form-label"
                          >
                            Designation
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.designation ? "is-invalid" : ""
                              }`}
                              id="last_name"
                              placeholder="Designation"
                              {...register("designation", {
                                required: "This field is required",
                              })}
                            />
                            {errors.designation && (
                              <div className="error invalid-feedback">
                                <p>{errors.designation.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group ">
                          <label
                            htmlFor="mobile"
                            className="col-sm-4 col-form-label"
                          >
                            Mobile
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.mobile ? "is-invalid" : ""
                              }`}
                              id="mobile"
                              placeholder="Mobile"
                              {...register("mobile", {
                                required: "This field is required",
                              })}
                            />
                            {errors.mobile && (
                              <div className="error invalid-feedback">
                                <p>{errors.mobile.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group ">
                          <label
                            htmlFor="corporateEmail"
                            className="col-sm-5 col-form-label"
                          >
                            Corporate Email
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="email"
                              className={`form-control ${
                                errors.corporateEmail ? "is-invalid" : ""
                              }`}
                              id="corporateEmail"
                              placeholder="Corporate Email"
                              {...register("corporateEmail", {
                                required: "This field is required",
                              })}
                            />
                            {errors.corporateEmail && (
                              <div className="error invalid-feedback">
                                <p>{errors.corporateEmail.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group ">
                          <label
                            htmlFor="confirmEmail"
                            className="col-sm-5 col-form-label"
                          >
                            Confirm Email
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="email"
                              className={`form-control ${
                                errors.confirmEmail ? "is-invalid" : ""
                              }`}
                              id="confirmEmail"
                              placeholder="Confirm Email"
                              {...register("confirmEmail", {
                                required: "This field is required",
                              })}
                            />
                            {errors.confirmEmail && (
                              <div className="error invalid-feedback">
                                <p>{errors.confirmEmail.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group ">
                          <label
                            htmlFor="address"
                            className="col-sm-4 col-form-label"
                          >
                            Address
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.address ? "is-invalid" : ""
                              }`}
                              id="address"
                              placeholder="Address"
                              {...register("address", {
                                required: "This field is required",
                              })}
                            />
                            {errors.address && (
                              <div className="error invalid-feedback">
                                <p>{errors.address.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="city"
                            className="col-sm-4 col-form-label"
                          >
                            City
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.city ? "is-invalid" : ""
                              }`}
                              id="city"
                              placeholder="City"
                              {...register("city", {
                                required: "This field is required",
                              })}
                            />
                            {errors.city && (
                              <div className="error invalid-feedback">
                                <p>{errors.city.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="state"
                            className="col-sm-4 col-form-label"
                          >
                            State
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.state ? "is-invalid" : ""
                              }`}
                              id="state"
                              placeholder="State"
                              {...register("state", {
                                required: "This field is required",
                              })}
                            />
                            {errors.state && (
                              <div className="error invalid-feedback">
                                <p>{errors.state.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="country"
                            className="col-sm-4 col-form-label"
                          >
                            Country
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.country ? "is-invalid" : ""
                              }`}
                              id="country"
                              placeholder="Country"
                              {...register("country", {
                                required: "This field is required",
                              })}
                            />
                            {errors.country && (
                              <div className="error invalid-feedback">
                                <p>{errors.country.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group ">
                          <label
                            htmlFor="zipCode"
                            className="col-sm-4 col-form-label"
                          >
                            Zip code
                          </label>
                          <div className="col-sm-12">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.zipCode ? "is-invalid" : ""
                              }`}
                              id="zipCode"
                              placeholder="Zip code"
                              {...register("zipCode", {
                                required: "This field is required",
                              })}
                            />
                            {errors.zipCode && (
                              <div className="error invalid-feedback">
                                <p>{errors.zipCode.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="captcha">
                      <ReCAPTCHA
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_SITEKEY}
                        onChange={handleCaptcha}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="payment_option"
                            {...register("zipCode", {
                              required: "This field is required",
                            })}
                            checked
                          />
                          <label className="form-check-label">
                            <img
                              className="visa_logo"
                              src="/dist/img/visa_mastercart_amex.png"
                              alt=""
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            {...register("term", {
                              required: "This field is required",
                            })}
                          />
                          <label className="form-check-label text-sm text-secondary">
                            I have read
                            <Link href="/terms-and-conditions" className="mx-1">
                              Terms and Conditions
                            </Link>
                            and I accept it.
                            <br />* Due to the nature of goods, orders once
                            placed can't be cancelled.
                          </label>
                        </div>
                      </div>
                      {errors.term && (
                        <div className="error invalid-feedback">
                          <p>{errors.term.message}</p>
                        </div>
                      )}
                    </div>
                    <button
                      className="btn btn-info justify-content-center mt-3"
                      //   disabled={!isVerified}
                      //   onClick={() => {
                      //     if (mobile.length !== 10) {
                      //       setMobileError(true);
                      //     }
                      //   }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default AskQuestions;
