import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, Fragment } from "react";

export default function Testimonial() {
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
    <section className="bg-light">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="border p-2  blue-background text-light text-center">
              <i className="fas fa-users mr-2"></i>Clients Testimonials
            </h5>

            <div
              id="carouselExampleIndicators1"
              className="carousel slide mt-4"
              data-interval="4000"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {testimonialList?.map((article, i) => (
                  <div
                    key={i + 1}
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                  >
                    <div className="d-block">
                      <p>
                        <i className="fas fa-quote-left text-lg mr-3"></i>"
                        {article.testimonial_description}"
                      </p>

                      <h5 className="text-blue">
                        <i className="far fa-user-circle text-lg mr-3"></i>
                        {article.testimonial_title}
                      </h5>
                      <hr className="m-2 dashed" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={`/testimonials`}
              className="btn btn-info my-2 mb-4"
              rel="noopener noreferrer"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
