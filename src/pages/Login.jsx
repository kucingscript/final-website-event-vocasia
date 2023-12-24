import { Link } from "react-router-dom";
import {
  BottomLogo,
  Footer,
  ModalForgotPassword,
  ShowNotification,
} from "../components";
import { headerLists, loginForms } from "../constants";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [datas, setDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setDatas({
      ...datas,
      [id]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        datas.email,
        datas.password
      );
      const user = res.user;
      if (!user.emailVerified) {
        ShowNotification({
          title: "Email not verified",
          text: "Please verify your email to proceed",
          icon: "error",
        });
        return;
      }
      setIsLoading(false);
      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <section className="bg-navy pt-2">
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="index.html">
              <img src="/images/logo.svg" alt="nusantarafest-logo" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
            <form
              onSubmit={handleFormSubmit}
              className="form-login d-flex flex-column mt-4 mt-md-0 p-30"
            >
              {loginForms.map((login, index) => (
                <div
                  className="d-flex flex-column align-items-start"
                  key={index}
                >
                  <label className="form-label">{login.label}</label>
                  <input
                    id={login.id}
                    type={login.type}
                    className="form-control"
                    placeholder={login.placeholder}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              <div className="d-grid mt-2 gap-3">
                <button type="submit" className="btn-green">
                  {isLoading ? "Redirecting..." : "Sign In"}
                </button>
                <Link to={"/register"} className="btn-navy">
                  Create New Account
                </Link>
                <div
                  className="d-flex justify-content-start"
                  style={{ cursor: "pointer" }}
                  onClick={handleShow}
                >
                  &nbsp;
                  <span className="text-primary">Forgot Password?</span>
                </div>
                <ModalForgotPassword show={show} handleClose={handleClose} />
              </div>
            </form>
          </div>
        </div>
      </section>

      <BottomLogo />
      <Footer />
    </>
  );
};

export default Login;
