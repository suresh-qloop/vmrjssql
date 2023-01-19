import React from "react";

import BackTop from "../components/common/BackTop";
import Footer from "../components/Frontend/Footer";
import NavbarTop from "../components/Frontend/NavbarTop";
import Navbar from "../components/Frontend/Navbar";
import Breadcrumb from "../components/Frontend/Breadcrumb";

export default function Privacy() {
  return (
    <div className="wrapper">
      <NavbarTop />
      <Navbar />
      <Breadcrumb name="Privacy Policy" />
      <section className="bg-light">
        <div className="container py-4">
          <h5 className="text-left">PRIVACY POLICY</h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            Value Market Research knows that you care how information about you
            is used and shared, and we appreciate your trust that we will do so
            carefully and sensibly. This notice describes our privacy policy. By
            visiting https://www.valuemarketresearch.com, you are accepting the
            practices described in this Privacy Notice.
          </p>

          <h5 className="text-left">
            What Personal Information About Customers Does Value Market Research
            Gather?
          </h5>
          <hr className="m-2 dashed" />

          <p className="text-secondary pb-3">
            The information we learn from customers helps us personalize and
            continually improve your delivery of business information.
          </p>

          <h5 className="text-left">
            Here Are The Types Of Information We Gather:
          </h5>
          <hr className="m-2 dashed" />
          <p className="text-secondary pb-3">
            Information You Give Us: We receive and store any information you
            enter on our Web site or give us in any other way. You can choose
            not to provide certain information, but then you might not be able
            to take advantage of many of our features. We use the information
            that you provide for such purposes as responding to your requests,
            customizing future shopping for you, improving our products, and
            communicating with you.
          </p>
          <p className="text-secondary pb-3">
            Automatic Information: We receive and store certain types of
            information whenever you interact with us. For example, like many
            Web sites, we use "cookies", and we obtain certain types of
            information when your Web browser accesses
            https://www.valuemarketresearch.com.
          </p>
          <p className="text-secondary pb-3">
            <strong> Note:</strong> Your browsing and purchasing patterns for
            market research information may be commercially sensitive. We
            recognize this. A number of companies offer utilities designed to
            help you visit Web sites anonymously. Although we will not be able
            to provide you with a personalized experience at Value Market
            Research if we cannot recognize you, we want you to be aware that
            these tools exist.
          </p>

          <p className="text-secondary pb-3">
            E-mail Communications: To help us make e-mails more useful and
            interesting, we often receive a confirmation when you open e-mail
            from valuemarketresearch.com if your computer supports such
            capabilities. We also compare our customer list to lists received
            from other companies, in an effort to avoid sending unnecessary
            messages to our customers. If you do not want to receive e-mail or
            other mail from us, please adjust your Customer Communication
            Preferences.
          </p>

          <p className="text-secondary pb-3">
            Information from Other Sources: We might receive information about
            you or your organization from other sources and add it to our
            account information.
          </p>

          <h5 className="text-left">What About Cookies?</h5>
          <hr className="m-2 dashed" />
          <p className="text-secondary pb-3">
            Cookies are alphanumeric identifiers that we transfer to your
            computer's hard drive through your Web browser to enable our systems
            to recognize your browser and to provide additional features such
            personalized information, and storage of items in your Shopping Cart
            between visits. The Help portion of the toolbar on most browsers
            will tell you how to prevent your browser from accepting new
            cookies, how to have the browser notify you when you receive a new
            cookie, or how to disable cookies altogether. However, cookies allow
            you to take full advantage of some of valuemarketresearch.com’
            coolest features, and we recommend that you leave them turned on.
          </p>

          <h5 className="text-left">How Secure Is Information About Me?</h5>
          <hr className="m-2 dashed" />
          <p className="text-secondary pb-3">
            We protect the security of your information during transmission by
            using Secure Sockets Layer (SSL) software, which encrypts
            information you input. It is important for you to protect against
            unauthorized access to your password and to your computer. Be sure
            to sign off when finished using a shared computer.
          </p>

          <hr className="m-2 dashed" />
        </div>
      </section>

      <BackTop />
      <Footer />
    </div>
  );
}
