import React from "react";
import Signature from "./Signature";

const Footer = () => {
  return (
    <footer>
      <p className="copy">
        Copyright &copy; {new Date().getFullYear()} | Created by <Signature />
      </p>
    </footer>
  );
};

export default Footer;
