import { Link, useLocation } from "react-router-dom";
import { headerLists } from "../constants";
import { useEffect, useState } from "react";

const PagesHeader = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentIndex = headerLists.findIndex(
      (header) => header.target === location.pathname
    );
    setActiveIndex(currentIndex);
  }, [location.pathname]);

  return (
    <section className="bg-navy pt-2">
      <nav className="container navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img src="/images/logo.svg" alt="" />
          </Link>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto my-3 my-lg-0">
              {headerLists.map((header, index) => (
                <Link
                  to={header.target}
                  className={`nav-link ${
                    index === activeIndex ? "active" : ""
                  }`}
                  key={index}
                >
                  {header.label}
                </Link>
              ))}
            </div>
            <div className="d-grid">
              <Link to={"/login"} className="btn-navy">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default PagesHeader;
