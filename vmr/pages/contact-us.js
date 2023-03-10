import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import { useRouter } from "next/router";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import notify from "../components/helpers/Notification";
import InputMask from "react-input-mask";
import Head from "next/head";

const ContactUs = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // setReportData(data);
  const router = useRouter();

  useEffect(() => {}, []);

  const handleCaptcha = async (value) => {
    setIsVerified(true);
  };

  const onSubmit = (data) => {
    if (number.length !== 10) {
      setNumberError(true);
      return false;
    }
    data.number = number;
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/front/contact`, data)
      .then((res) => {
        // notify("success", "Form Submitted Successfully");
        // router.push("/");
      })
      .catch(function (error) {
        console.log(error);
        notify("error", error.response.data.message);
      });
    router.push("/thank-you");
  };

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/dist/img/favicon.ico"
        />
        <meta
          name="keywords"
          content="Contact Value Market Research, Contact VMR"
        />
        <meta
          name="description"
          content="We would be glad to hear your questions, comments and concerns. Mail us at sales@valuemarketresearch.com"
        ></meta>

        <title>Contact us - Value Market Research</title>
      </Head>
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Contact Us" />
      <div className=" bg-white  pb-5">
        <div className="container  pb-4 px-2">
          <h5 className=" form-heading my-3">GET IN TOUCH</h5>
          <div className="row">
            <div className="col-md-6 ">
              <div className="card form-bg-light">
                <div className="card-body">
                  <p className=" ">
                    Contact us today, and get reply within 24 hours!
                  </p>

                  <hr />
                  <form className="mb-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className="col-sm-12 col-form-label"
                      >
                        Name
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          id="name"
                          placeholder="Name"
                          {...register("name", {
                            required: "This field is required",
                          })}
                        />
                        {errors.name && (
                          <div className="error invalid-feedback">
                            <p>{errors.name.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-sm-12 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-12">
                        <input
                          type="email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          id="email"
                          placeholder="Email"
                          {...register("email", {
                            required: "This field is required",
                          })}
                        />
                        {errors.email && (
                          <div className="error invalid-feedback">
                            <p>{errors.email.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="mobile"
                        className="col-sm-12 col-form-label"
                      >
                        Mobile
                      </label>
                      <div className="col-sm-12">
                        {/* <Controller
                          name="number"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: "Please enter a card number",
                            minLength: 10,
                          }}
                          render={({
                            field: { onChange, value, onBlur, ref },
                          }) => (
                            <InputMask
                              mask="99999 99999"
                              maskChar=" "
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                            >
                              {(inputProps) => (
                                <input
                                  {...inputProps}
                                  className={`form-control ${
                                    errors.number ? "is-invalid" : ""
                                  }`}
                                  id="mobile"
                                  placeholder="Mobile"
                                />
                              )}
                            </InputMask>
                          )}
                        /> */}
                        <input
                          type="text"
                          className={`form-control ${
                            numberError ? "is-invalid" : ""
                          }`}
                          pattern="[0-9]*"
                          id="number"
                          value={number}
                          placeholder="Number"
                          size="10"
                          maxLength="10"
                          // minlength="10"
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === "" ||
                              re.test(e.target.value)
                            ) {
                              setNumber(e.target.value);
                              setNumberError(false);
                            } else {
                              setNumberError(true);
                            }
                          }}
                        />
                        {numberError && (
                          <div className="error invalid-feedback">
                            <p>Please Enter Valid Mobile Number</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="message"
                        className="col-sm-12 col-form-label"
                      >
                        Message
                      </label>
                      <div className="col-sm-12">
                        <textarea
                          type="text"
                          className={`form-control ${
                            errors.message ? "is-invalid" : ""
                          }`}
                          id="message"
                          placeholder="Message"
                          rows={5}
                          {...register("message", {
                            required: "This field is required",
                          })}
                        />
                        {errors.message && (
                          <div className="error invalid-feedback">
                            <p>{errors.message.message}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="captcha">
                      <ReCAPTCHA
                        size="normal"
                        sitekey={process.env.NEXT_PUBLIC_SITEKEY}
                        onChange={handleCaptcha}
                      />
                    </div>

                    <button
                      className="btn btn-info justify-content-center mt-3"
                      disabled={!isVerified}
                      onClick={() => {
                        if (number.length !== 10) {
                          setNumberError(true);
                        }
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border p-3">
                <p className="text-sm text-secondary mt-3">
                  <i className="fas fa-home mr-2"></i> 401/402, TFM, Nagras
                  Road, Aundh, Pune-7. Maharashtra, INDIA.
                </p>
                <p>
                  <a
                    href="mailto:sales@valuemarketresearch.com"
                    className="text-sm  text-blue"
                  >
                    <i className="far fa-envelope mr-2"></i>
                    sales@valuemarketresearch.com
                  </a>
                </p>
                <p>
                  <a href="tel:8882941147" className="text-sm text-secondary">
                    <i className="fas fa-mobile-alt mr-2"></i>+1-888-294-1147
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default ContactUs;
