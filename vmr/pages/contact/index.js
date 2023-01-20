import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

const Contact = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/contact-us");
  }, []);

  return <Fragment></Fragment>;
};

export default Contact;
