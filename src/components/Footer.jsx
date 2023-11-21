import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer bg-navy">
      <div className="container">
        <a href="index.html">
          <img src="/images/logo.svg" alt="" />
        </a>
        <div className="mt-3 d-flex flex-row flex-wrap footer-content align-items-baseline">
          <p className="paragraph">
            Semina adalah tempat di mana <br className="d-md-block d-none" />{" "}
            anda dapat mencari event sesuai <br className="d-md-block d-none" />{" "}
            dengan minat & terdekat.
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
          Build with &#9829; by
        </div>
      </div>
    </footer>
  );
};

export default Footer;
