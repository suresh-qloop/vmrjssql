import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Testimonial() {
  const [testimonialList, setTestimonialList] = useState([]);
  console.log(testimonialList);
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
    <div className="col-md-6">
      <h3>Clients Testimonials</h3>
      <div
        id="carouselExampleIndicators1"
        className="carousel slide my-4"
        data-interval="5000"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {testimonialList?.map((article, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
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
      </div>
      <button className="btn btn-info my-2">Read More</button>
    </div>
  );
}