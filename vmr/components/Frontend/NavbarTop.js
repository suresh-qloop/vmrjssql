import React, { useState } from "react";
import Link from "next/link";

const NavbarTop = () => {
  const [email, setEmail] = useState("sales@valuemarketresearch.com");
  return (
    <div className=" blue-background  sticky-top">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xs-7 text-lg-left">
            <div className="nav-link  text-light text-sm">
              <Link className="text-light" href={`mailto:${email}`}>
                <i className="fas fa-envelope-open-text mr-2 "></i>
                &nbsp; {email}
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-xs-5 text-lg-right">
            <div className="nav-link text-light text-sm">
              {/* <i className="fas fa-phone-alt"></i> &nbsp; +1-888-294-1147 */}
              <Link href="tel:8882941147" className="text-sm text-light">
                <i className="fas fa-phone-alt mr-2"></i>+1-888-294-1147
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
