import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import notify from "../../helpers/Notification";
import Header from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import { useState } from "react";

const Client = ({ preLoadedValues }) => {
  const { data } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [logoImage, setLogoImage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preLoadedValues });

  const onSubmit = (clientData) => {
    // console.log(clientData);
    // if (typeof clientData.logo[0] === "object") {
    //   setFinalData(clientData);
    // } else {
    //   delete clientData.logo;
    //   setFinalData(clientData);
    // }
    // console.log(finalData);
    const finalData = new FormData();
    finalData.append("client_name", clientData.client_name);
    if (logoImage !== undefined) {
      finalData.append("logo", logoImage);
    }
    finalData.append("link", clientData.link);

    axios
      .put(`${process.env.NEXT_PUBLIC_NEXT_API}/client/${id}`, finalData, {
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      })
      .then((res) => {
        notify("success", "Client Updated Successfully");
        router.push("/admin/clients");
      })
      .catch((error) => {
        console.log(error);
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
                <h1>Edit Client Information</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Client</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Edit Client Information</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="client_name"
                          className="col-sm-2 col-form-label"
                        >
                          Client Name
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.client_name ? "is-invalid" : ""
                            }`}
                            id="client_name"
                            placeholder="Client Name"
                            {...register("client_name", {
                              required: "This field is required",
                            })}
                          />
                          {errors.client_name && (
                            <div className="error invalid-feedback">
                              <p>{errors.client_name.message}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="logo"
                          className="col-sm-2 col-form-label"
                        >
                          Logo
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="file"
                            className="form-control"
                            id="logo"
                            placeholder="Logo"
                            // {...register("logo", {
                            //   //   required: "This field is required",
                            // })}
                            onChange={(e) => {
                              setLogoImage(e.target.files[0]);
                            }}
                          />
                          {/* {errors.logo && (
                            <div className="error invalid-feedback">
                              <p>{errors.logo.message}</p>
                            </div>
                          )} */}
                        </div>
                        <img
                          src={`${process.env.NEXT_PUBLIC_NEXT_API}/uploads/logos/${preLoadedValues.logo}`}
                          alt=""
                        />
                      </div>
                      <div className="form-group ">
                        <label
                          htmlFor="link"
                          className="col-sm-2 col-form-label"
                        >
                          Link
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.link ? "is-invalid" : ""
                            }`}
                            id="link"
                            placeholder="Link"
                            {...register("link", {
                              required: "This field is required",
                            })}
                          />
                          {errors.link && (
                            <div className="invalid-feedback">
                              <p>{errors.link.message}</p>
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
                        href="/admin/clients"
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

export default Client;
