import Link from "next/link";
import React from "react";

export default function BackTop() {
  return (
    <Link
      id="back-to-top"
      href="#"
      className="btn btn-primary back-to-top"
      role="button"
      aria-label="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </Link>
  );
}
