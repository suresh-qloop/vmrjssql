import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";

import Latest from "../components/Frontend/Home/Latest";
import Fact from "../components/Frontend/Home/Fact";
import Testimonial from "../components/Frontend/Home/Testimonial";
import Research from "../components/Frontend/Home/Research";
import Client from "../components/Frontend/Home/Client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <section className=" bg-light  p-md-5 p-3">
        <div className="container p-md-5 py-3">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h1 className="banner_title">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Magnam, deserunt.
              </h1>
              <button className="btn btn-info  mt-md-3">
                Try Compass for Free
              </button>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>
      <Research />
      <section className="bg-light">
        <div className="container py-5">
          <div className="row">
            <Testimonial />
            <div className="col-md-6 choose">
              <h3>Why Choose Us</h3>
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
            <h3 className="text-center">
              Some facts about Value Market Research, Inc.
            </h3>
          </div>
          <Fact />
          <Client />
        </div>
      </section>
      <Latest />
      <Link
        id="back-to-top"
        href="#"
        className="btn btn-primary back-to-top"
        role="button"
        aria-label="Scroll to top"
      >
        <i class="fas fa-chevron-up"></i>
      </Link>
      <Footer />
    </div>
  );
}
