import Navbar from "../components/Frontend/Navbar";
import NavbarTop from "../components/Frontend/NavbarTop";
import Footer from "../components/Frontend/Footer";
import Link from "next/link";

export default function Thanks() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <section className=" bg-white  p-md-5 p-3">
        <div className="container p-md-5 py-3">
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <h1 className="banner_title">
                Thank you <br /> for getting in touch!
              </h1>
              <p className="pt-3">
                We appreciate you contacting us <b> Value Market Research.</b>{" "}
                <br />
                One of our colleagues will get back in touch with you soon! Have
                a great day!
              </p>
              <Link href="/" className="btn btn-info  mt-md-3">
                Back to Home
              </Link>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
