import axios from "axios";
import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const [testimonialList, setTestimonialList] = useState([]);
  useEffect(() => {
    getReportList();
    // eslint-disable-next-line
  }, []);

  const getReportList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/testimonials`)
      .then((res) => {
        setTestimonialList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card ">
      <div className="card-header  text-center p-2 blue-background text-light">
        <strong> Testimonials</strong>
      </div>
      <div className="card-body" style={{ height: "100%" }}>
        <div
          id="carouselExampleIndicators1"
          className="carousel slide"
          data-ride="carousel"
          data-interval="4000"
        >
          <div className="carousel-inner">
            {testimonialList?.map((article, i) => (
              <div
                key={i}
                className={`carousel-item ${i === 0 ? "active" : ""}`}
              >
                <div className="d-block ">
                  <p>
                    <i className="fas fa-quote-left text-lg mr-3"></i>"
                    {article.testimonial_description}"
                  </p>

                  <h5>
                    <i className="far fa-user-circle text-lg mr-3"></i>
                    {article.testimonial_title}
                  </h5>
                  <hr className="m-2 dashed" />
                </div>
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators1"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-custom-icon" aria-hidden="true">
              <i className="fas fa-chevron-left"></i>
            </span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next "
            href="#carouselExampleIndicators1"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-custom-icon" aria-hidden="true">
              <i className="fas fa-chevron-right"></i>
            </span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
