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
            <div className="col-md-12 col-sm-12 text-center">
              <h1 className="banner_title">
                Thank You for contacting Value Market Research and sharing your
                details.
              </h1>
              <p className="pt-3 text-center">
                Our Sales team representative will get in touch with you soon.
                In case you wish to contact us, kindly write to us at
                sales@valuemarketresearch.com
              </p>
              <Link href="/reports" className="btn btn-info  mt-md-3">
                View Related Reports
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
