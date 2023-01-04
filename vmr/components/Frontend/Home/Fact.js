import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Fact() {
  const [settingList, setSettingList] = useState();

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
  useEffect(() => {
    getSettings();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-md-3  text-center  ">
        <div className="fact_listing">
          <h3>{settingList?.reports}+</h3>
          <h4>Reports Published</h4>
        </div>
      </div>
      <div className="col-md-3  text-center">
        <div className="fact_listing">
          <h3>{settingList?.categories}+</h3>
          <h4>Industries we serve</h4>
        </div>
      </div>
      <div className="col-md-3  text-center ">
        <div className="fact_listing">
          <h3>{settingList?.articles}+</h3>
          <h4>Analysts</h4>
        </div>
      </div>
      <div className="col-md-3  text-center">
        <div className="fact_listing">
          <h3>{settingList?.clientQueries}+</h3>
          <h4>Client Queries in 2022</h4>
        </div>
      </div>
    </div>
  );
}
