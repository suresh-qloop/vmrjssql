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
      <section className="  carosal  p-5">
        <div className="carosal-bg-color">
          <div className="container ">
            <div className="row">
              <div className="col-md-8 col-sm-12 p-5">
                <h4 className="text-light">
                  We add value to the business with our
                </h4>
                <h1 className="banner_title">
                  Customized and Syndicate Market Research Reports
                </h1>
              </div>
              <div className="col-md-4 col-sm-12"></div>
            </div>
          </div>
        </div>
      </section>
      {/* <Research /> */}
      <section className=" choose">
        <div className="bg-color text-white">
          <div className="container pt-3">
            <div className="row">
              <div className="col-md-12 ">
                <div className="heading">
                  <h4 className="text-center">Why Choose Us</h4>
                </div>

                <div className="row text-center mb-3">
                  <div className="col-md-3">
                    <div className="bg-box">
                      <i className="fas fa-user  mb-3"></i>
                      <h5> CLIENT FIRST POLICY</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="bg-box">
                      <i className="fas fa-certificate  mb-3"></i>
                      <h5>EXCELLENT QUALITY</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="bg-box">
                      <i className="fas fa-handshake  mb-3"></i>
                      <h5> AFTER SALES SUPPORT</h5>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="bg-box">
                      <i className="far fa-envelope mb-3"></i>
                      <h5> 24/7 EMAIL SUPPORT</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light">
        <div className="container  pt-4">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 pb-3">
              <Testimonial />
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-4">
          <div className="heading">
            <h4 className="text-center">
              Some facts about Value Market Research
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
