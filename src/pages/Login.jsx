import { Link, useNavigate } from "react-router-dom";
import { BottomLogo } from "../components";
import { headerLists, loginForms } from "../constants";

const Login = () => {
  const navigate = useNavigate("/");

  return (
    <>
      <section className="bg-navy pt-2">
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="index.html">
              <img src="/images/logo.svg" alt="" />
            </a>
            <button className="navbar-toggler" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto my-3 my-lg-0">
                {headerLists.map((header, index) => (
                  <Link to={header.target} className="nav-link" key={index}>
                    {header.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </section>

      <section className="login header bg-navy">
        <div className="container">
          <div className="d-flex flex-column align-items-center hero gap-5">
            <div>
              <div className="hero-headline text-start">Sign In</div>
            </div>
            <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
              {loginForms.map((login, index) => (
                <div
                  className="d-flex flex-column align-items-start"
                  key={index}
                >
                  <label className="form-label">{login.label}</label>
                  <input
                    type={login.type}
                    className="form-control"
                    placeholder={login.placeholder}
                  />
                </div>
              ))}
              <div className="d-grid mt-2 gap-4">
                <button
                  type="submit"
                  className="btn-green"
                  onClick={() => navigate("/")}
                >
                  Sign In
                </button>
                <Link to={"/register"} className="btn-navy">
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <BottomLogo />
    </>
  );
};

export default Login;
