import dynamic from "next/dynamic";
// import { useRouter } from "next/router";
// import Navbar from "../components/Frontend/Navbar";
// import NavbarTop from "../components/Frontend/NavbarTop";
// import Footer from "../components/Frontend/Footer";
// import Latest from "../components/Frontend/Home/Latest";
// import Fact from "../components/Frontend/Home/Fact";
// import Testimonial from "../components/Frontend/Home/Testimonial";
// import Client from "../components/Frontend/Home/Client";
// import BackTop from "../components/common/BackTop";
// import WhyChooseUs from "../components/Frontend/Home/WhyChooseUs";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Navbar = dynamic(() => import("../components/Frontend/Navbar"));
const NavbarTop = dynamic(() => import("../components/Frontend/NavbarTop"));
const Footer = dynamic(() => import("../components/Frontend/Footer"));
const Latest = dynamic(() => import("../components/Frontend/Home/Latest"));
const Fact = dynamic(() => import("../components/Frontend/Home/Fact"));
const Testimonial = dynamic(() =>
  import("../components/Frontend/Home/Testimonial")
);
const Client = dynamic(() => import("../components/Frontend/Home/Client"));
const WhyChooseUs = dynamic(() =>
  import("../components/Frontend/Home/WhyChooseUs")
);

export default function Home() {
  // const { locale } = useRouter();
  const { t: translate } = useTranslation("home");
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />

      <section className="carousal">
        <div className="container p-lg-5 p-sm-0">
          <div className="row">
            <div className="col-md-8 col-sm-12 p-5">
              <h4 className="text-dark">
                <strong> {translate("small")}</strong>
              </h4>
              <h1 className="banner_title">{translate("hero")}</h1>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
        <WhyChooseUs />
      </section>
      <Testimonial />
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
