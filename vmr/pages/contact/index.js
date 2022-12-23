import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Navbar from "../../components/Frontend/Navbar";
import NavbarTop from "../../components/Frontend/NavbarTop";
import Footer from "../../components/Frontend/Footer";
import Breadcrumb from "../../components/Frontend/Breadcrumb";
import { useRouter } from "next/router";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import notify from "../../components/helpers/Notification";

const ContactUs = () => {
  // console.log(data, "context");
  const [isVerified, setIsVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // setReportData(data);
  const router = useRouter();

  useEffect(() => {}, []);

  const handleCaptcha = async (value) => {
    console.log("value", value);
    setIsVerified(true);
  };

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_NEXT_API}/front/contact`, data)
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
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Contact Us" />
      <div className=" bg-light py-3 pb-5">
        <div className="container bg-white p-4 px-2">
          <div className="row">
            <div className="col-md-6 ">
              <div className="card">
                <div className="card-body">
                  <p className="text-center text-secondary">
                    Please fill out the form. We will contact you within 24
                    hours.
                  </p>
                  <h3 className="text-center mb-3">GET IN TOUCH</h3>
                  <form className="my-5" onSubmit={handleSubmit(onSubmit)}>
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
                        <input
                          type="number"
                          className={`form-control ${
                            errors.number ? "is-invalid" : ""
                          }`}
                          id="mobile"
                          placeholder="Mobile"
                          {...register("number", {
                            required: "This field is required",
                          })}
                        />
                        {errors.number && (
                          <div className="error invalid-feedback">
                            <p>{errors.number.message}</p>
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

                    {/* <div className="captcha">
                      <ReCAPTCHA
                        size="normal"
                        sitekey="6LdAAQojAAAAAKcx4MuWVWwBxQ1V1rANtwrKth-v"
                        onChange={handleCaptcha}
                      />
                    </div> */}

                    <button
                      className="btn btn-info justify-content-center mt-3"
                      //   disabled={!isVerified}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border p-3">
                <h5 className=" ">
                  <strong>Address</strong>
                </h5>
                <p className="text-sm text-secondary mt-3">
                  <i className="fas fa-home mr-2"></i> 401/402, TFM, Nagras
                  Road, Aundh, Pune-7. Maharashtra, INDIA.
                </p>
                <p>
                  <a
                    href="mailto:sales@valuemarketresearch.com"
                    className="text-sm text-secondary "
                  >
                    <i class="far fa-envelope mr-2"></i>
                    sales@valuemarketresearch.com
                  </a>
                </p>
                <p>
                  <a href="tel:8882941147" className="text-sm text-secondary">
                    <i class="fas fa-mobile-alt mr-2"></i>+1-888-294-1147
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
