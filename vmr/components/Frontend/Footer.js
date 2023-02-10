import React, { useState, useEffect } from "react";
import Link from "next/link";

const Footer = () => {
  const [codate, setCodate] = useState();

  useEffect(() => {
    let date = new Date().getFullYear();
    setCodate(date);

    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/5ac844094b401e45400e6c9d/default";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);
  return (
    <div className="main-footer1 ">
      <div className="container main-footer1-con bottom_border">
        {/* <div className="social">
          <ul className="social_footer_ul text-center">
            <li>
              <Link
                href="https://www.facebook.com/valuemarketresearch/"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/vmr_reports" target="_blank">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/value-market-research/"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="footerboxriben">
          <ul>
            <li>Follow Us</li>
            <li>
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/valuemarketresearch/"
                className="facebook"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link
                aria-label="Twitter"
                href="https://twitter.com/vmr_reports"
                className="twitter"
                target="_blank"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                aria-label="LinkedIn"
                href="https://www.linkedin.com/company/value-market-research/"
                className="linkedin"
                target="_blank"
              >
                <i className="fab fa-linkedin"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className=" col-sm-12 col-md-3 ">
            <h5 className="headin5_amrc col_white_amrc pt2">USEFUL LINKS</h5>

            <ul className="footer_ul_amrc">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/reports">Reports</Link>
              </li>
              <li>
                <Link href="/upcoming-reports">Upcoming Reports</Link>
              </li>
              <li>
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/how-to-order">How To Order</Link>
              </li>
              <li>
                <Link href="/research-methodology">Research Methodology</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">FIND ASSISTANCE</h5>

            <ul className="footer_ul_amrc">
              <li>
                <Link href="/pressreleases">Press Release</Link>
              </li>
              <li>
                <Link href="/analysis">Analysis</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link target="_blank" href="/sitemap.xml">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">CONTACT</h5>

            <ul className="footer_ul_amrc">
              <li>
                <p>
                  401/402, TFM, Nagras Road, Aundh, Pune-7. Maharashtra, INDIA
                </p>
              </li>
              <li>
                <Link href="mailto:sales@valuemarketresearch.com">
                  sales@valuemarketresearch.com
                </Link>
              </li>
              <li>
                <p> +1-888-294-1147 </p>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">BUSINESS HOURS</h5>

            <ul className="footer_ul2_amrc">
              <li>
                <p>Monday to Friday : 9 A.M IST to 6 P.M IST</p>
                <p>Saturday-Sunday : Closed</p>
                <p>Email Support : 24 x 7</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 ">
            <p className="text-center my-4  text-light">
              © {codate}, All Rights Reserved,&nbsp;
              <Link href="/" className="text-decoration-none  text-light">
                Value Market Research
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
