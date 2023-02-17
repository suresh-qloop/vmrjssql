import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
import { useRouter } from "next/router";
import Latest from "../components/Frontend/Home/Latest";
import Fact from "../components/Frontend/Home/Fact";
import Testimonial from "../components/Frontend/Home/Testimonial";
// import Research from "../components/Frontend/Home/Research";
import Client from "../components/Frontend/Home/Client";
// import BackTop from "../components/common/BackTop";
import WhyChooseUs from "../components/Frontend/Home/WhyChooseUs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import Link from "next/link";

export default function Home() {
  // const { locale } = useRouter();
  const { t: translate } = useTranslation("home");
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
          <div className="row">
            <div className="col-md-8 col-sm-12 p-5">
              <h4 className="text-dark ">
                <strong> {translate("small")}</strong>
              </h4>
              <h1 className="banner_title">
                {/* Customized and Syndicate Market Research Reports */}
                {translate("hero")}
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
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-12 ">
              <Testimonial />
            </div>
            {/* <div className="col-md-1"></div> */}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-4">
          <h5 className="border p-2  blue-background text-light text-center">
            <i className="fas fa-industry mr-2"></i>Some Facts About Value
            Market Research
          </h5>

          <Fact />
          <Client />
        </div>
      </section>
      <Latest />

      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  };
}
