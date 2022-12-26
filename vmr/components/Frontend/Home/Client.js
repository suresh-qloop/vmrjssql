import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Fact() {
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
    <div className="row mt-5 justify-content-center">
      {clientList?.map((client, i) => (
        <div className="col-md-2 border text-center" key={i + 1}>
          <img
            src={`${process.env.NEXT_PUBLIC_NEXT_API}/uploads/logos/${client.logo}`}
            className="client_image"
            alt="client_image"
          />
        </div>
      ))}

      <p className="text-center text-secondary mt-3">
        We have served more than 4,500 global clients
      </p>
    </div>
  );
}
