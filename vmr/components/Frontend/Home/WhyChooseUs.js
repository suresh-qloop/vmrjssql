import React from "react";
import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const WhyChooseUs = () => {
  const { t: translate } = useTranslation("home");
  return (
    <div className="bg-color text-white">
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-12 ">
            <div className="heading">
              <h5 className="text-center"> {translate("wco")}</h5>
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
  );
};

export default WhyChooseUs;

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["home"])),
//     },
//   };
// }
