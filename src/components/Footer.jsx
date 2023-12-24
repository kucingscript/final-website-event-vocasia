import React from "react";
import { footerLinks } from "../constants";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer bg-navy">
      <div className="container">
        <Link to="/">
          <img src="/images/logo.svg" alt="nusantarafest-logo" />
        </Link>
        <div className="mt-3 d-flex flex-row flex-wrap footer-content align-items-baseline">
          <p className="paragraph">
            NusantaraFest adalah panggung keindahan dimana
            <br className="d-md-block d-none" /> minat dan preferensi bertemu
            dalam harmoni, <br className="d-md-block d-none" /> menciptakan
            pengalaman yang tak terlupakan.
          </p>
          {footerLinks.map((foots, index1) => (
            <div className="d-flex flex-column footer-links" key={index1}>
              <div className="title-links mb-3">{foots.title}</div>
              {foots.links.map((foots, index2) => (
                <React.Fragment key={index2}>
                  <a href="#" onClick={handleClick}>
                    {foots.label}
                  </a>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center paragraph all-rights">
          Build with &#9829; by Eventning - Vocasia FE 2
          <p className="d-none">Build with ♥ by Kucingscript</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
