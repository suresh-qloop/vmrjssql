import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="main-footer1">
      <div className="container bottom_border">
        <div className="row">
          <div className=" col-sm-12 col-md-3 ">
            <h5 className="headin5_amrc col_white_amrc pt2">USEFUL LINKS</h5>

            <ul className="footer_ul_amrc">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/reports">Reports</Link>
              </li>
              <li>
                <Link href="/">Upcoming Reports</Link>
              </li>
              <li>
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">FIND ASSISTANCE</h5>

            <ul className="footer_ul_amrc">
              <li>
                <Link href="/articles">Press Release</Link>
              </li>
              <li>
                <Link href="/articles">Analyses</Link>
              </li>
              <li>
                <Link href="/">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/">FAQ</Link>
              </li>
              <li>
                <Link href="/">Disclaimer</Link>
              </li>
              <li>
                <Link href="/">Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">CONTACT</h5>

            <ul className="footer_ul_amrc">
              <li>
                <p>
                  401/402, TFM, Nagras Road, Aundh, Pune-7. Maharashtra, INDIA
                  <br /> sales@valuemarketresearch.com +1-888-294-1147
                </p>
              </li>
            </ul>
          </div>

          <div className=" col-sm-12 col-md-3  ">
            <h5 className="headin5_amrc col_white_amrc pt2">BUSINESS HOURS</h5>

            <ul className="footer_ul2_amrc">
              <li>
                <p>
                  Monday to Friday : 9 A.M IST to 6 P.M IST Saturday-Sunday :
                  Closed Email Support : 24 x 7
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <p className="text-center mt-3  ">
          © 2022, All Rights Reserved,
          <Link href="/">Value Market Research</Link>
        </p>
        <ul className="social_footer_ul">
          <li>
            <Link href="/">
              <i className="fab fa-facebook-f"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i className="fab fa-twitter"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i className="fab fa-linkedin"></i>
            </Link>
          </li>
          <li>
            <Link href="/">
              <i className="fab fa-instagram"></i>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
