import React, { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

const Industries = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/category-list");
  }, []);

  return <Fragment></Fragment>;
};

export default Industries;
