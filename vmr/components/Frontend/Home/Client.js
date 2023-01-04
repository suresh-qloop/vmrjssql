import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Fact() {
  const [clientList, setClientList] = useState([]);
  const [settingList, setSettingList] = useState();
  useEffect(() => {
    getClientList();
    getSettings();
    // eslint-disable-next-line
  }, []);

  const getSettings = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_NEXT_API}/front/settings`)
      .then((res) => {
        setSettingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <Link href={client.link} target="_blank">
            <img
              src={`${process.env.NEXT_PUBLIC_NEXT_API}/uploads/logos/${client.logo}`}
              className="client_image"
              alt="client_image"
            />
          </Link>
        </div>
      ))}

      <p className="text-center text-secondary mt-3">
        We have served more than {settingList?.clients} global clients
      </p>
    </div>
  );
}
