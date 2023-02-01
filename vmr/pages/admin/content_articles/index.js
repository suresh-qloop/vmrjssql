import React, { useEffect, useState, useRef } from "react";

import DataTable from "react-data-table-component";

import axios from "axios";
import Link from "next/link";

import { useSession } from "next-auth/react";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import Header from "../../../components/Admin/Header";
import Menu from "../../../components/Admin/Menu";
import Footer from "../../../components/Admin/Footer";
import notify from "../../../components/helpers/Notification";

const ArticleList = () => {
  const { status, data } = useSession();
  const refContainer = useRef();

  const [articleData, setArticleData] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecords, setNoRecords] = useState(false);

  const headline = (article) => {
    return article.headline;
  };
  const article_type = (article) => {
    return article.article_type;
  };
  const meta_title = (article) => {
    return article.meta_title;
  };
  const meta_desc = (article) => {
    return article.meta_desc;
  };
  const meta_keywords = (article) => {
    return article.meta_keywords;
  };

  const customStyles = {
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const columns = [
    {
      name: "Headline",
      selector: headline,
      sortable: true,
      width: "270px",
    },
    {
      name: "Article Type",
      selector: article_type,
      sortable: true,
      width: "170px",
    },
    {
      name: "Meta Title",
      selector: meta_title,
      sortable: true,
      width: "300px",
    },
    {
      name: "Meta Description",
      selector: meta_desc,
      sortable: true,
      width: "300px",
    },
    {
      name: "Meta Keywords",
      selector: meta_keywords,
      sortable: true,
      width: "300px",
    },
    {
      name: "Action",
      button: true,
      grow: 1,
      width: "190px",
      cell: (article) => (
        <div>
          <Link
            href={`../content_articles/${article.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-success mr-2"
          >
            View
          </Link>
          <Link
            href={`/admin/content_articles/edit/${article.id}`}
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-outline-info mr-2"
          >
            Edit
          </Link>

          <button
            type="button"
            onClick={() => {
              deleteArticle(article.id);
            }}
            className={`btn btn-sm btn-outline-danger mr-2 ${
              data?.user.role === 1 ? "" : "d-none"
            }`}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // useEffect(() => {
  const temp_rows = articleData.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );

  useEffect(() => {
    getArticleData();
    // eslint-disable-next-line
  }, [status]);

  const getArticleData = async () => {
    if (status === "authenticated") {
      setLoading(true);
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/content-article`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setArticleData(res.data);
          setLoading(false);
          if (res.data.length < 0) {
            setNoRecords(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deleteArticle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_NEXT_API}/content-article/${id}`, {
            headers: {
              Authorization: `Bearer ${data.user.token}`,
            },
          })
          .then((res) => {
            getArticleData();
            notify("success", "Article Deleted Successfully");
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
                <h1>Manage Articles</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">All Articles</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">All Articles</h3>
            </div>
            <div className="card-body">
              <div
                id="example1_wrapper"
                className="dataTables_wrapper dt-bootstrap4"
              >
                <div className="row my-3">
                  <div className="col-md-9 col-sm-9  text-left">
                    <Link
                      href="/admin/content_articles/add"
                      style={{ marginRight: "5px" }}
                      className="btn btn-primary mb-2"
                    >
                      Add Article
                    </Link>
                  </div>
                  <div className="col-md-3 col-sm-3 text-right">
                    <label className="d-flex ">
                      <input
                        type="search"
                        placeholder="Enter text for search"
                        className="form-control ml-3  "
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                {loading && (
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <div
                        className="spinner-border text-danger text-center"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={refContainer}>
                  <DataTable
                    title="Client List"
                    customStyles={customStyles}
                    noDataComponent={
                      noRecords ? "There are no records to display" : ""
                    }
                    columns={columns}
                    data={temp_rows}
                    pagination
                    striped
                    noHeader
                    highlightOnHover
                  />
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

export default ArticleList;
