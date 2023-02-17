import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import Breadcrumb from "../components/Frontend/Breadcrumb";
import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
// import { currencyInrFormat } from "../utils/utils.js";

import moment from "moment/moment";
import WhyChooseUs from "../components/Frontend/SideBar/WhyChooseUs";
import Objectives from "../components/Frontend/SideBar/Objectives";
import Clients from "../components/Frontend/SideBar/Clients";
import Testimonials from "../components/Frontend/SideBar/Testimonials";
import BackTop from "../components/common/BackTop";
import Head from "next/head";
// import { useRouter } from "next/router";

// import { useSession } from "next-auth/react";

const Analysis = () => {
  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getArticleList();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setHasMore(count > articleList.length ? true : false);
    // eslint-disable-next-line
  }, [articleList]);

  const getArticleList = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/analysis?start=0&limit=10`
      )
      .then((res) => {
        setArticleList(res.data.articles);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMoreArticle = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXT_API}/front/analysis?start=${articleList.length}&limit=2`
      )
      .then((res) => {
        const articles = res.data.articles;
        setArticleList((articleList) => [...articleList, ...articles]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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
          content="Free Industry Analysis, Current Market Analysis, Industry Analysis and Expert's review."
        />
        <meta
          name="description"
          content="Read our free analysis of trending markets and industries."
        ></meta>

        <title>Analysis - Value Market Research</title>
      </Head>
      <div className="wrapper">
        <NavbarTop />
        {/* <Navbar onSubmit={getData} searchName={setData} allCount={getCount} /> */}
        <Navbar />
        <Breadcrumb name="Analysis" />
        <div className=" bg-light pb-5 pt-2">
          <div className="container bg-white pb-5 ">
            <div className="row">
              <div className="col-md-12 bg-light">
                <h4>ANALYSIS</h4>
                <p>
                  This section highlights the latest development and identifies
                  ongoing latest research in different industries.
                </p>
              </div>
              <div className="col-md-9">
                <div className="row">
                  {articleList?.length === 0 && (
                    <div className="text-center m-5 p-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <InfiniteScroll
                    dataLength={articleList.length} //This is important field to render the next data
                    next={getMoreArticle}
                    hasMore={hasMore}
                    loader={
                      <div className="text-center m-5 p-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    }
                    endMessage={
                      <p className="mt-2" style={{ textAlign: "center" }}>
                        <b></b>
                      </p>
                    }
                  >
                    {articleList?.map((article, i) => (
                      <div className="col-md-12" key={i + 1}>
                        <div
                          className="card flex-md-row shadow-none rounded-0   mb-0 "
                          style={{ borderBottom: "1px dashed #ccc" }}
                        >
                          <div className="card-body d-flex flex-column align-items-start">
                            <p>
                              <i className="far fa-calendar-alt mr-2"></i>
                              <span>
                                {moment(article.created).format("MMMM YYYY")}
                              </span>
                            </p>
                            <h5 className="mb-0 text-blue">
                              <Link
                                target="_blank"
                                className="text-blue"
                                href={`/analysis/${article.slug}`}
                              >
                                {article.headline}
                              </Link>
                            </h5>

                            <p
                              className="card-text text-secondary mb-auto my-3 dangerously-article"
                              dangerouslySetInnerHTML={{
                                __html: article.description,
                              }}
                            >
                              {/* {report.name.slice(0, 150)}... */}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </InfiniteScroll>
                </div>
              </div>
              <div className="col-md-3 mt-4">
                <WhyChooseUs />
                <Objectives />
                <Clients />
                <Testimonials />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Analysis;
