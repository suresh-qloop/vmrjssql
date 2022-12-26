import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../components/Frontend/Navbar";
import NavbarTop from "../../../components/Frontend/NavbarTop";
import Footer from "../../../components/Frontend/Footer";
import Breadcrumb from "../../../components/Frontend/Breadcrumb";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";
import notify from "../../../components/helpers/Notification";

const RequestForDiscount = () => {
  const [reportData, setReportData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // setReportData(data);
  const router = useRouter();
  const { slug } = router.query;

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
    getReportData();
  }, [slug]);

  const handleCaptcha = async (value) => {
    setIsVerified(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.report = reportData.product_name;
    const finalData = { ...data, name, description };
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/front/req-email`, finalData)
      .then((res) => {
        notify("success", "Form Submitted Successfully");
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        notify("error", error.response.data.message);
      });
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
      <Breadcrumb name="Covid 19 Impact" />
      <div className=" bg-light py-3">
        <div className="container bg-white p-4 px-2">
          <div className="row">
            <div className="col-md-6 ">
              <div className="card">
                <div className="card-body">
                  <p className="text-center text-secondary">
                    Please fill out the form. We will contact you within 24
                    hours.
                  </p>
                  <h3 className="text-center mb-3">Request for Discount</h3>
                  <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                      <label
                        htmlFor="fullName"
                        className="col-sm-4 col-form-label"
                      >
                        Full Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.fullName ? "is-invalid" : ""
                          }`}
                          id="fullName"
                          placeholder="Full Name"
                          {...register("fullName", {
                            required: "This field is required",
                          })}
                        />
                        {errors.fullName && (
                          <div className="error invalid-feedback">
                            <p>{errors.fullName.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="organization"
                        className="col-sm-4 col-form-label"
                      >
                        Organization
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.organization ? "is-invalid" : ""
                          }`}
                          id="organization"
                          placeholder="Organization"
                          {...register("organization", {
                            required: "This field is required",
                          })}
                        />
                        {errors.organization && (
                          <div className="error invalid-feedback">
                            <p>{errors.organization.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="designation"
                        className="col-sm-4 col-form-label"
                      >
                        Designation
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.designation ? "is-invalid" : ""
                          }`}
                          id="designation"
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
                    <div className="form-group row">
                      <label
                        htmlFor="mobile"
                        className="col-sm-4 col-form-label"
                      >
                        Mobile
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
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

                    <div className="form-group row">
                      <label
                        htmlFor="corporateEmail"
                        className="col-sm-4 col-form-label"
                      >
                        Corporate Email
                      </label>
                      <div className="col-sm-8">
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
                    <div className="form-group row">
                      <label
                        htmlFor="confirmEmail"
                        className="col-sm-4 col-form-label"
                      >
                        Confirm Email
                      </label>
                      <div className="col-sm-8">
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
                    <div className="form-group row">
                      <label
                        htmlFor="country"
                        className="col-sm-4 col-form-label"
                      >
                        Country
                      </label>
                      <div className="col-sm-8">
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
                    <div className="form-group row">
                      <label
                        htmlFor="question"
                        className="col-sm-4 col-form-label"
                      >
                        Question
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.question ? "is-invalid" : ""
                          }`}
                          id="question"
                          placeholder="Question"
                          {...register("question", {
                            required: "This field is required",
                          })}
                        />
                        {errors.question && (
                          <div className="error invalid-feedback">
                            <p>{errors.question.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <input
                        type="hidden"
                        className="form-control"
                        id="type"
                        placeholder="type"
                        {...register("type")}
                        value="Request For Discount"
                      />
                    </div>
                    <div className="captcha">
                      <ReCAPTCHA
                        size="normal"
                        sitekey="6LdAAQojAAAAAKcx4MuWVWwBxQ1V1rANtwrKth-v"
                        onChange={handleCaptcha}
                      />
                    </div>
                    <button
                      className="btn btn-info justify-content-center mt-3"
                      disabled={!isVerified}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h5 className="px-2 mt-3">
                <i className="fas fa-chart-line text-lg text-success mr-2"></i>{" "}
                {name}
              </h5>

              <p
                className="text-secondary px-2 dangerously"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              ></p>

              <div className="card mx-md-5 my-md-5">
                <h5 className="card-header  text-center py-3">
                  <strong> Why Choose Us</strong>
                </h5>
                <div className="card-body ">
                  <ul
                    className=" p-0 text-center"
                    style={{ listStyle: "none", margin: 0 }}
                  >
                    <li>
                      <i className="fas fa-user border rounded-circle p-3 mr-3"></i>
                      <span className=" ">
                        Client First Policy &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="fas fa-certificate border rounded-circle p-3 mr-3"></i>
                      <span className=" ">
                        Excellent Quality &nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="fas fa-handshake border rounded-circle p-3 mr-3"></i>
                      <span className=" ">After Sales Support</span>
                    </li>
                    <hr className="m-2 dashed" />
                    <li>
                      <i className="far fa-envelope border rounded-circle p-3 mr-3"></i>
                      <span className=" ">24/7 Email Support</span>
                    </li>
                    <hr className="m-2 dashed" />
                  </ul>
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

export default RequestForDiscount;
