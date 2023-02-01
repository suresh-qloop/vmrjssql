import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

const Contact = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/contact-us");
    // eslint-disable-next-line
  }, []);

  return <Fragment></Fragment>;
};

export default Contact;
