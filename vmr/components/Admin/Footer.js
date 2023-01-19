import React, { useState, useEffect } from "react";

const Footer = () => {
  const [codate, setCodate] = useState();

  useEffect(() => {
    let date = new Date().getFullYear();
    setCodate(date);
  }, []);

  return (
    <footer className="main-footer">
      <strong>Copyright © {codate}</strong>&nbsp; All rights reserved.
    </footer>
  );
};

export default Footer;
