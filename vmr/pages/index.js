import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";

import Latest from "../components/Frontend/Home/Latest";
import Fact from "../components/Frontend/Home/Fact";
import Testimonial from "../components/Frontend/Home/Testimonial";
import Research from "../components/Frontend/Home/Research";
import Client from "../components/Frontend/Home/Client";
import BackTop from "../components/common/BackTop";
import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <section className=" bg-white carosal  p-md-5 p-3">
        <div className="container p-md-5 py-3">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h4> We add value to the business with our</h4>
              <h1 className="banner_title">
                Customized and Syndicate Market Research Reports
              </h1>
              {/* <Link href="/reports" className="btn btn-info  mt-md-3">
                Click to learn More
              </Link> */}
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>
      {/* <Research /> */}
      <section className="bg-light">
        <div className="container py-5">
          <div className="row">
            <Testimonial />
            <div className="col-md-6 choose">
              <h4>Why Choose Us</h4>
              <ul className="my-4" style={{ paddingLeft: 0 }}>
                <li className="my-2">
                  Our team of 400+ Industry Experts, Analysts and SME's work
                  across 50+ industries to deliver precise and qualitative data.
                </li>
                <li className="my-2">
                  We give the flexibility to our clients to purchase only
                  required sections /tables without buying the entire report.
                </li>
                <li className="my-2">
                  We customize the scope of the study to meet the client's
                  business needs.
                </li>
                <li className="my-2">
                  We provide 24x7 support for all the pre-sales and post-sales
                  queries.
                </li>
                <li className="my-2">
                  We ensure our clients credentials are kept completely
                  confidential.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="container py-5">
          <div className="heading">
            <h4 className="text-center">
              Some facts about Value Market Research, Inc.
            </h4>
          </div>
          <Fact />
          <Client />
        </div>
      </section>
      <Latest />
      <BackTop />
      <Footer />
    </div>
  );
}
