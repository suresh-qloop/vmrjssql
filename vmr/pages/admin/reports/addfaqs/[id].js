import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";
import notify from "../../../../components/helpers/Notification";
import Header from "../../../../components/Admin/Header";
import Menu from "../../../../components/Admin/Menu";
import Link from "next/link";
import Footer from "../../../../components/Admin/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AddFaq = () => {
  const { status, data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (faqsData, e) => {
    e.preventDefault();

    faqs.push(faqsData);
    e.target.reset();
  };

  const deleteHandler = async (question) => {
    const removeFaqs = await faqs.filter((item) => item.question !== question);
    setFaqs(removeFaqs);
  };

  const faqSubmitHandler = async (e) => {
    e.preventDefault();

    const foundQ = faqs.some((el) => el.question === "");
    if (foundQ) {
      // setQueError(true);
      notify("error", "Please fill out all fields");
      return faqs;
    }

    const foundA = faqs.some((el) => el.answer === "");
    if (foundA) {
      notify("error", "Please fill out all fields");
      return faqs;
    }

    setFaqs(faqs);
    let result = faqs.reduce(
      (r, { question, answer }) => ((r[question] = answer), r),
      {}
    );
    console.log(result);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_NEXT_API}/report/faq/${id}`,
        { faqs: result },
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        // setFaqs(res.data.report.faqs);
        notify("success", "FAQ Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getEditData();
    // eslint-disable-next-line
  }, [status, id]);

  function removeLastWord(str) {
    const lastIndexOfSpace = str.lastIndexOf(" ");

    if (lastIndexOfSpace === -1) {
      return str;
    }

    return str.substring(0, lastIndexOfSpace);
  }

  const getEditData = async () => {
    if (status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/report/${id}`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          if (res.data.product_faq !== null) {
            // setFaqs(res.data.product_faq)
            const obj = JSON.parse(res.data.product_faq);

            let output = Object.entries(obj).map(([question, answer]) => ({
              question,
              answer,
            }));
            setFaqs(output);
            setLoading(false);
          } else {
            setFaqs([
              {
                question: `What is ${removeLastWord(res.data.alias)} Size?`,
                answer: "",
              },
              {
                question: `What is the projected ${removeLastWord(
                  res.data.alias
                )} growth under the study period?`,
                answer: "",
              },
              {
                question: `Which region holds the highest ${removeLastWord(
                  res.data.alias
                )} share ?`,
                answer: "",
              },
              {
                question: `What is the ${removeLastWord(
                  res.data.alias
                )} segmentation covered in the report?`,
                answer: "",
              },
              {
                question: `Who are the leading ${removeLastWord(
                  res.data.alias
                )} manufacturers profiled in the report?`,
                answer: "",
              },
            ]);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create FAQ</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Create FAQ</li>
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
                    <h3 className="card-title">Create FAQ</h3>
                  </div>
                  {/* <form
                    className="form-horizontal"
                    // onSubmit={handleSubmit(onSubmit)}
                  > */}
                  <div className="card-body">
                    {loading && (
                      <div className="text-center m-5 p-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                    {faqs.map(({ question, answer }, i) => {
                      return (
                        <form key={i + 1}>
                          <div className="row">
                            <div className="col-md-5">
                              <div className="form-group ">
                                <label
                                  htmlFor="question"
                                  className="col-sm-2 col-form-label"
                                >
                                  Question
                                </label>
                                <div className="col-sm-12">
                                  <input
                                    type="text"
                                    className={`form-control `}
                                    defaultValue={question}
                                    id="question"
                                    placeholder="Question"
                                    onChange={(e) => {
                                      faqs[i].question = e.target.value;
                                    }}
                                    required
                                  />
                                  {/* {queError && (
                                    <div className=" text-danger">
                                      <p>Please enter the Question</p>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-5">
                              <div className="form-group ">
                                <label
                                  htmlFor="answer"
                                  className="col-sm-2 col-form-label"
                                >
                                  Answer
                                </label>
                                <div className="col-sm-12">
                                  <input
                                    type="text"
                                    className={`form-control `}
                                    defaultValue={answer}
                                    id="answer"
                                    placeholder="Answer"
                                    onChange={(e) => {
                                      faqs[i].answer = e.target.value;
                                    }}
                                    required
                                  />
                                  {/* {ansError && (
                                    <div className=" text-danger">
                                      <p>Please enter the Answer</p>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="form-group ">
                                <label
                                  htmlFor=""
                                  className="col-sm-2 col-form-label"
                                >
                                  &nbsp;
                                </label>
                                <div className="col-sm-12">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteHandler(question);
                                    }}
                                    className="btn btn-danger "
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      );
                    })}
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group ">
                              <label
                                htmlFor="question"
                                className="col-sm-2 col-form-label"
                              >
                                Question
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.question ? "is-invalid" : ""
                                  }`}
                                  id="question"
                                  placeholder="Question"
                                  {...register("question", {
                                    required: "Please enter the Question",
                                  })}
                                />
                                {errors.question && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.question.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group ">
                              <label
                                htmlFor="answer"
                                className="col-sm-2 col-form-label"
                              >
                                Answer
                              </label>
                              <div className="col-sm-12">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.answer ? "is-invalid" : ""
                                  }`}
                                  id="answer"
                                  placeholder="Answer"
                                  {...register("answer", {
                                    required: "Please enter the Answer",
                                  })}
                                />
                                {errors.answer && (
                                  <div className="error invalid-feedback">
                                    <p>{errors.answer.message}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group ">
                              <label
                                htmlFor=""
                                className="col-sm-2 col-form-label"
                              >
                                &nbsp;
                              </label>
                              <div className="col-sm-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary "
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button
                      type="submit"
                      onClick={faqSubmitHandler}
                      className="btn btn-info"
                    >
                      Save
                    </button>
                    <Link href="/admin/reports">
                      <button className="btn btn-default float-right">
                        Cancel
                      </button>
                    </Link>
                  </div>
                  {/* </form> */}
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

export default AddFaq;
