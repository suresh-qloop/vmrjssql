import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

const Badges = () => {
  const { status, data } = useSession();
  const [enquire, setEnquire] = useState();

  useEffect(() => {
    getEnquirieData();
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
          console.log(enquire);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div class="row">
      <div class="col-lg-4 col-6">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>{enquire?.todays}</h3>
            <p>Total Leads Today</p>
          </div>
          <div class="icon">
            <i class="ion fas fa-check-circle"></i>
          </div>
          {/* <Link href="admin/enquiries/todays" class="small-box-footer">
            More info <i class="fas fa-arrow-circle-right"></i>
          </Link> */}
        </div>
      </div>

      <div class="col-lg-4 col-6">
        <div class="small-box bg-success">
          <div class="inner">
            <h3>{enquire?.sevenDays}</h3>
            <p>Total Leads in Last 7 Days</p>
          </div>
          <div class="icon">
            <i class="ion fas fa-check-circle"></i>
          </div>
          {/* <Link href="#" class="small-box-footer">
            More info <i class="fas fa-arrow-circle-right"></i>
          </Link> */}
        </div>
      </div>

      <div class="col-lg-4 col-6">
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>{enquire?.thirtyDays}</h3>
            <p>Total Leads in Last 30 Days</p>
          </div>
          <div class="icon">
            <i class="ion fas fa-check-circle"></i>
          </div>
          {/* <Link href="#" class="small-box-footer">
            More info <i class="fas fa-arrow-circle-right"></i>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Badges;
