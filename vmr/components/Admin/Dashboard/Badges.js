import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import axios from "axios";

const Badges = () => {
  const { status, data } = useSession();
  const [enquire, setEnquire] = useState();

  useEffect(() => {
    getEnquirieData();
    // eslint-disable-next-line
  }, [status]);

  const getEnquirieData = async () => {
    if (status === "authenticated") {
      await axios
        .get(`${process.env.NEXT_PUBLIC_NEXT_API}/dashboard/enquiriesCount`, {
          headers: {
            Authorization: `Bearer ${data.user.token}`,
          },
        })
        .then((res) => {
          setEnquire(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-lg-4 col-6">
        <div className="small-box bg-info">
          <div className="inner">
            <h3>{enquire?.todays}</h3>
            <p>Total Leads Today</p>
          </div>
          <div className="icon">
            <i className="ion fas fa-check-circle"></i>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-6">
        <div className="small-box bg-success">
          <div className="inner">
            <h3>{enquire?.sevenDays}</h3>
            <p>Total Leads in Last 7 Days</p>
          </div>
          <div className="icon">
            <i className="ion fas fa-check-circle"></i>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-6">
        <div className="small-box bg-warning">
          <div className="inner">
            <h3>{enquire?.thirtyDays}</h3>
            <p>Total Leads in Last 30 Days</p>
          </div>
          <div className="icon">
            <i className="ion fas fa-check-circle"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
