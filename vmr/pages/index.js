import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";

import Latest from "../components/Frontend/Home/Latest";
import Fact from "../components/Frontend/Home/Fact";
import Testimonial from "../components/Frontend/Home/Testimonial";
// import Research from "../components/Frontend/Home/Research";
import Client from "../components/Frontend/Home/Client";
import BackTop from "../components/common/BackTop";
import WhyChooseUs from "../components/Frontend/Home/WhyChooseUs";
// import Link from "next/link";

export default function Home() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />

      {/* <div className="carousel ">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={`/dist/img/slider.webp`}
              alt=""
              width={"100%"}
              height={"450px"}
            />
            <div className="banner-carousel-caption    align-items-center">
              <p> We add value to the business with our</p>
              <h1>Customized and Syndicate Market Research Reports</h1>
            </div>
          </div>
        </div>
      </div> */}

      <section className="carosal">
        <div className="container p-lg-5 p-sm-0">
          <div className="row ">
            <div className="col-md-8 col-sm-12 p-5 ">
              <h4 className="text-dark ">
                <strong> We add value to the business with our</strong>
              </h4>
              <h1 className="banner_title">
                Customized and Syndicate Market Research Reports
              </h1>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
        <WhyChooseUs />
      </section>
      {/* <Research /> */}

      <section className="bg-light">
        <div className="container  py-3">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10 ">
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
