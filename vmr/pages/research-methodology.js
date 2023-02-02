import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import NavbarTop from "../components/Frontend/NavbarTop";

import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";

export default function Research() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Research Methodology" />
      <section className="bg-light">
        <div className="container py-4">
          <h5 className="text-left">RESEARCH METHODOLOGY</h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            Research methodology is a key tool that helps to accomplish the
            report in a proficient manner. Value market research report enables
            the clients to understand the opportunity and market trend by
            providing economic insight. Our team conducts various primary and
            secondary research to generate the report with the latest trend and
            key aspects with respect to each industry and region.
          </p>

          <p className="text-secondary pb-3">
            Our report is equipped with analysis of market-based on the Porter's
            Five Forces Model, this tool helps to understand the industry
            structure and analyses the competition intensity attractiveness and
            profitability in the market by taking into factors such as
            bargaining power of buyers and suppliers, the threat from substitute
            products and the threat from new entrants.
          </p>
          <img
            src="/dist/img/TDA-BUA.webp"
            alt=""
            className="research-img my-2"
          />
          <p className="text-secondary pb-3">
            The top-down approach and bottom-down approach is followed to reach
            the final research findings. These two approaches are excellent
            strategies of information processing and knowledge ordering. In the
            top-down approach, the global market was further bifurcated to gain
            insight into market segments on the basis of the percentage share of
            each segment. This approach helped in arriving at the market size of
            each segment globally. The segments market size was further broken
            down in the regional market size of each segment and sub-segments.
            Then, the sub-segments were further broken down to country level
            market. The market size arrived using this approach was then
            cross-checked with the market size arrived by using a bottom-up
            approach. Whereas, in the bottom-up approach, we arrived at the
            country market size by identifying the market size and market shares
            of the key market players. The country market sizes then were added
            up to arrive at the regional market size, which eventually added up
            to arrive at the global market size.
          </p>
          <p className="text-secondary pb-3">
            Consequently, it helps the client to decide the best way to
            integrate identity management capabilities into the business
            environment.
          </p>
          <hr className="m-2 dashed" />
        </div>
      </section>

      <BackTop />
      <Footer />
    </div>
  );
}
