import React from "react";
import { Link, useLocation } from "react-router-dom";

const PagesNotFound = () => {
  const location = useLocation();

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> {location.pathname} not
          found.
        </p>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link to={"/"} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PagesNotFound;
