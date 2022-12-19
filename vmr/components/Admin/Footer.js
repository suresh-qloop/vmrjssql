import React, { useState, useEffect } from "react";

const Footer = () => {
  const [codate, setCodate] = useState();

  useEffect(() => {
    let date = new Date().getFullYear();
    setCodate(date);
  }, []);

  return (
    <div>
      <footer className="main-footer">
        <strong>Copyright © {codate}</strong>&nbsp; All rights reserved.
      </footer>
    </div>
  );
};

export default Footer;
