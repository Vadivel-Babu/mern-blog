import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green p-5 text-center">
      <p> @ {new Date().getFullYear()} copyright to blog.</p>
    </footer>
  );
};

export default Footer;
