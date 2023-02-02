import React from "react";

const Objectives = () => {
  return (
    <div className="card ">
      <div className="card-header  text-center p-2 blue-background text-light">
        <strong> Objectives of Study</strong>
      </div>
      <div className="card-body">
        <ul className="m-0 pl-3">
          <li>
            <span className=" text-sm">
              Define and measure the global market
            </span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">
              Volume or revenue forecast of the global market and its various
              sub-segments with respect to main geographies
            </span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">
              Analyze and identify major market trends along with the factors
              driving or inhibiting the market growth
            </span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">
              Study the company profiles of the major market players with their
              market share
            </span>
          </li>
          <hr className="m-2 dashed" />
          <li>
            <span className=" text-sm">Analyze competitive developments</span>
          </li>
          <hr className="m-2 dashed" />
        </ul>
      </div>
    </div>
  );
};

export default Objectives;
