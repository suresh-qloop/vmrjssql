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
import { urlString } from "../../../utils/urlString";

import crypto from "crypto";

// import Razorpay from "razorpay";
const AskQuestions = () => {
  const router = useRouter();

  const { slug } = router.query;
  const [reportData, setReportData] = useState([]);

  const [isVerified, setIsVerified] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [amount, setAmount] = useState("");
  // const [singleUserPrice, setSingleUser] = useState(false);
  // const [upTo10UserPrice, setUpTo10User] = useState(false);
  // const [corporateUserPrice, setCorporateUser] = useState(false);
  // const [datapackPrice, setDataPack] = useState(false);

  const handleCaptcha = async (value) => {
    setIsVerified(!isVerified);
  };

  const getReportData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/report/${slug}`)
      .then((res) => {
        setReportData(res.data);
        // setName(res.data.product_name);
        // setDescription(res.data.product_description);
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
    const price = sessionStorage.getItem("price");
    if (price) {
      setAmount(price);
    }
    // if (!amount) {
    //   setAmount(price);
    // }
    // eslint-disable-next-line
  }, [slug]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const onSubmit = async (data) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    data.report = reportData.product_name;
    data.publisher_name = reportData.publisher_name;
    data.slug = reportData.slug;
    data.price = reportData.price;
    data.product_id = reportData.id;
    data.alias = reportData.alias;
    data.amount = amount;
    const finalData = {
      ...data,
      mobile,
    };
    console.log(finalData);
    const {
      data: { order },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXT_API}/payment/`,
      finalData
    );
    console.log(order);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZOR_API_KEY, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "USD",
      name: "Value Market Research",
      description: "Market Research Report as per agreement over the email",
      image: "/dist/img/logos/vmr-logo.webp",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: `${process.env.NEXT_PUBLIC_NEXT_API}/payment/payment-verification`,
      prefill: {
        name: `${finalData.first_name} ${finalData.last_name}`,
        email: finalData.corporateEmail,
        contact: finalData.mobile,
      },
      notes: {
        name: `${finalData.first_name} ${finalData.last_name}`,
        address: finalData.address,
        email: finalData.corporateEmail,
        mobile: finalData.mobile,
        id: finalData.product_id,
        alias: finalData.alias,
        price: finalData.amount,
      },
      handler: async function (response) {
        let values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        const body =
          values.razorpay_order_id + "|" + values.razorpay_payment_id;
        const expectedSignature = crypto
          .createHmac("sha256", process.env.NEXT_PUBLIC_RAZOR_KEY_SECRET)
          .update(body.toString())
          .digest("hex");
        const isAuthentic = expectedSignature === values.razorpay_signature;

        if (isAuthentic) {
          // Database comes here
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_NEXT_API}/payment/payment-user-add`,
            finalData
          );
          router.push("/payment_success");
        } else {
          router.push("/payment_failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
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

      <div className="bg-white  py-3 shadow  rounded">
        <div className="container  px-2">
          <div className="row">
            <div className="col-md-12 ">
              <div className="card bg-light">
                <div className="card-body">
                  <h2 className="text-center ">
                    <strong>
                      <Link
                        href={`/report/${reportData.slug}`}
                        className="text-blue"
                      >
                        {reportData.alias}
                      </Link>
                    </strong>
                  </h2>
                  <div className="row mt-4">
                    <div className="col-md-6 ">
                      <h4 className="text-lg-right text-right">Buy Now</h4>
                    </div>
                    <div className="col-md-6 justify-content-center">
                      {/* <Link
                        href={`/industries/${
                          reportData.category_name
                            ? urlString(reportData.category_name)
                            : ""
                        }`}
                        className="btn btn-primary btn-sm text-light  "
                      >
                        View Related Reports
                      </Link> */}
                      <div className="enq-btn">
                        <Link
                          className="form-btn"
                          // target="_blank"
                          href={`/industries/${
                            reportData.category_name
                              ? urlString(reportData.category_name)
                              : ""
                          }`}
                        >
                          View Related Reports
                        </Link>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row text-sm">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={reportData.price}
                              name="price"
                              id="single"
                              onChange={(e) => {
                                setAmount(reportData.price);
                              }}
                              checked={
                                amount == reportData.price ? true : false
                              }
                            />
                            <label
                              htmlFor="single"
                              className="form-check-label"
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
                              value={reportData.upto10}
                              name="price"
                              id="upto10"
                              onChange={(e) => {
                                setAmount(reportData.upto10);
                              }}
                              checked={
                                amount == reportData.upto10 ? true : false
                              }
                            />
                            <label
                              htmlFor="upto10"
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
                              value={reportData.corporate_price}
                              name="price"
                              id="corporate_price"
                              onChange={(e) => {
                                setAmount(reportData.corporate_price);
                              }}
                              checked={
                                amount == reportData.corporate_price
                                  ? true
                                  : false
                              }
                            />
                            <label
                              htmlFor="corporate_price"
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
                              value={reportData.data_pack_price}
                              name="price"
                              id="data_pack_price"
                              onChange={(e) => {
                                setAmount(reportData.data_pack_price);
                              }}
                              checked={
                                amount == reportData.data_pack_price
                                  ? true
                                  : false
                              }
                            />
                            <label
                              htmlFor="data_pack_price"
                              className="form-check-label"
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
                                mobileError === true ? "is-invalid" : ""
                              }`}
                              pattern="[0-9]*"
                              id="mobile"
                              value={mobile}
                              placeholder="Mobile Number"
                              size="10"
                              maxLength="10"
                              // {...register("mobile", {
                              //   required: "This field is required",
                              // })}
                              // onChange={(e) => setMobile(e.target.value)}
                              onChange={(e) => {
                                const re = /^[0-9\b]+$/;
                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  setMobile(e.target.value);
                                  setMobileError(false);
                                } else {
                                  setMobileError(true);
                                }
                              }}
                            />
                            {mobileError && (
                              <div className="error invalid-feedback">
                                <p>Please Enter Valid Mobile Number</p>
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
                              type="text"
                              className={`form-control ${
                                errors.corporateEmail ? "is-invalid" : ""
                              }`}
                              id="corporateEmail"
                              placeholder="Corporate Email"
                              {...register("corporateEmail", {
                                required: "This field is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "invalid email address",
                                },
                              })}
                              onPaste={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onCopy={(e) => {
                                e.preventDefault();
                                return false;
                              }}
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
                              type="text"
                              className={`form-control ${
                                errors.confirmEmail ? "is-invalid" : ""
                              }`}
                              id="confirmEmail"
                              placeholder="Confirm Email"
                              {...register("confirmEmail", {
                                required: "This field is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "invalid email address",
                                },
                                validate: (value) => {
                                  const { corporateEmail } = getValues();
                                  return (
                                    corporateEmail === value ||
                                    "Email should match!"
                                  );
                                },
                              })}
                              onPaste={(e) => {
                                e.preventDefault();
                                return false;
                              }}
                              onCopy={(e) => {
                                e.preventDefault();
                                return false;
                              }}
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
                        // size="normal"
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
                            {...register("payment_option", {
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
                      <div className="form-group ">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className={`form-check-input ${
                              errors.term ? "is-invalid" : ""
                            }`}
                            {...register("term", {
                              required: "This field is required",
                            })}
                          />
                          <label
                            className="form-check-label text-sm text-secondary"
                            htmlFor="term"
                          >
                            I have read
                            <Link href="/terms-and-conditions" className="mx-1">
                              Terms and Conditions
                            </Link>
                            and I accept it.
                          </label>
                          {errors.term && (
                            <div className="error invalid-feedback">
                              <p>{errors.term.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        className="btn btn-info justify-content-center mt-3 "
                        disabled={!isVerified}
                        onClick={() => {
                          if (mobile.length !== 10) {
                            setMobileError(true);
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
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
