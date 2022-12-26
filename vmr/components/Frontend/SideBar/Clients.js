import axios from "axios";
import React, { useState, useEffect } from "react";

const Clients = () => {
  const [clientList, setClientList] = useState([]);
  useEffect(() => {
    getClientList();
    // eslint-disable-next-line
  }, []);

  const getClientList = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/clients`)
      .then((res) => {
        setClientList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card ">
      <div className="card-header  text-center p-2">
        <strong> Clients</strong>
      </div>
      <div className="card-body">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {clientList?.map((client, i) => (
              <div
                className={`carousel-item client-logo ${
                  i === 0 ? "active" : ""
                }`}
                key={i}
              >
                <img
                  className="d-block w-100 "
                  src={`${process.env.NEXT_PUBLIC_NEXT_API}/uploads/logos/${client.logo}`}
                  alt=""
                />
              </div>
            ))}
          </div>

          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-custom-icon" aria-hidden="true">
              <i className="fas fa-chevron-left"></i>
            </span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
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

export default Clients;
