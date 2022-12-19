import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import notify from "../../../../../components/helpers/Notification";
import Header from "../../../../../components/Admin/Header";
import Menu from "../../../../../components/Admin/Menu";
import Footer from "../../../../../components/Admin/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const AddChidCategory = () => {
  const { data } = useSession();
  const navigate = useRouter();
  const { id } = navigate.query;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (catData) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_NEXT_API}/category/add-child/${id}`,
        catData,
        {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        }
      )
      .then((res) => {
        notify("success", "Category Added Successfully");
        navigate.push("/admin/categories");
      })
      .catch(function (error) {
        console.log(error);
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
                <h1>Create Level 2 Category</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    Create Level 2 Category
                  </li>
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
                    <h3 className="card-title">Create Level 2 Category</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="form-group ">
                        <label
                          htmlFor="category_name"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className={`form-control ${
                              errors.category_name ? "is-invalid" : ""
                            }`}
                            id="category_name"
                            placeholder="Category Name"
                            {...register("category_name", {
                              required: "This field is required",
                            })}
                          />
                          {errors.category_name && (
                            <div className="error invalid-feedback">
                              <p>{errors.category_name.message}</p>
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
                        href="/admin/categories"
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

export default AddChidCategory;
