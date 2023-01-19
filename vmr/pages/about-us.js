import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import Latest from "../components/Frontend/Home/Latest";
import NavbarTop from "../components/Frontend/NavbarTop";
import Client from "../components/Frontend/Home/Client";
import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";

export default function About() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="About Us" />
      <section className="bg-light">
        <div className="container py-4">
          <h5 className="text-left"> ABOUT US</h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            Value Market Research facilitates its clients with resourceful
            syndicated and customized market research reports on more than 50
            industries with global as well as regional coverage. Our robust
            database and analysis have assisted many Fortune 500 companies,
            consultants, well-known academic institutions, and non-profit
            organizations. We help our clients with their strategic plans and
            assist them in making informed decisions leading to their growth.
            Our industry research reports can provide granular quantitative
            information with key industry insights to support sustainable
            organizational development.
          </p>

          <h5 className="text-left">OUR VISION</h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            Our vision is to ease decision-making and empower the strategists by
            providing them with holistic market information.
          </p>

          <h5 className="text-left">OUR MISSION</h5>
          <hr className="m-2 dashed" />
          <p>
            We are a result-oriented organization and are expanding to achieve
            our mission:
          </p>
          <p className="text-dark pb-3">
            <strong>
              "To facilitate strategic decision-makers with the updated,
              intellectual, and authentic data repository"
            </strong>
          </p>

          <h5 className="text-left">OUR APPROACH</h5>
          <hr className="m-2 dashed" />
          <p className="text-secondary pb-3">
            There is no one standard approach to build a report that is concise
            and detailed. For a company that deals with numerous industry
            verticals, relying on one approach isn't often futile. We believe
            that the process of developing business intelligence for each market
            has to be fresh and unique as the trends, drivers, restraints,
            regional aspects, and competition dynamics are unique for each
            market. This brings us to follow a research methodology that is
            based on current standard protocols, past experience, and, more
            importantly, from a mixture of expert advice and profound data
            analysis.
          </p>

          <h5 className="text-left">OUR ADVISORY & CONSULTING TEAM</h5>
          <hr className="m-2 dashed" />
          <p className="text-secondary">
            We believe that significant problems require extraordinary people to
            solve them, while outstanding people are always drawn toward solving
            incomparable problems. We have put together our team around this
            principle, with consultants, industry analysts, and domain experts
            benefiting from their global experience, serving us to deliver
            excellence in all assignments we have undertaken. Our highly
            experienced consulting team is always enthusiastic to go above and
            beyond to meet client requirements. Their determination and mindset
            towards offering the best to our customers make our reports
            prominent. Our research team are a perfect amalgamation of wise
            experience and youthful energy that reproduce our work quality.
          </p>
          <p className="text-secondary pb-3">
            Our industry experts' team evaluates strategic options, shapes
            successful action plans & help companies make critical bottom-line
            decisions. Our immense market intelligence repository and industry
            experts together put us in a position to grow alongside our clients.
          </p>

          <h5 className="text-left">WHY VALUE MARKET RESEARCH?</h5>
          <hr className="m-2 dashed" />
          <ul className="text-secondary ">
            <li>
              Our team of 400+ Industry Experts, Analysts and SME's work across
              50+ industries to deliver precise and qualitative data.
            </li>
            <li>
              We give the flexibility to our clients to purchase only required
              sections /tables without buying the entire report.
            </li>
            <li>
              We customize the scope of the study to meet the client's business
              needs.
            </li>
            <li>
              We provide 24x7 support for all the pre-sales and post-sales
              queries.
            </li>
            <li>
              We ensure our clients credentials are kept completely
              confidential.
            </li>
          </ul>
          <p>
            For more information, write to us at sales@valuemarketresearch.com
          </p>
        </div>
      </section>
      <section className="bg-white">
        <div className="container py-5">
          <div className="heading">
            <h3 className="text-center">Oue Clients.</h3>
          </div>

          <Client />
        </div>
      </section>
      <Latest />
      <BackTop />
      <Footer />
    </div>
  );
}
