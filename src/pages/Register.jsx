import { BottomLogo, PagesHeader } from "../components";
import { registerForms } from "../constants";

const Register = () => {
  return (
    <>
      <PagesHeader />
      <section className="login header bg-navy">
        <div className="container">
          <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero">
            <div className="col-md-6">
              <div className="hero-headline text-start">
                Expand Your <br className="d-none d-md-block" />
                Knowledge & Skills
              </div>
              <p className="hero-paragraph text-start">
                Kami menyediakan berbagai acara terbaik untuk membantu{" "}
                <br className="d-none d-lg-block" />
                anda dalam meningkatkan skills di bidang teknologi
              </p>
            </div>
            <div className="col-md-6">
              <form className="form-login d-flex flex-column mt-4 mt-md-0">
                {registerForms.map((register, index) => (
                  <div
                    className="d-flex flex-column align-items-start"
                    key={index}
                  >
                    <label className="form-label">{register.label}</label>
                    <input
                      type={register.type}
                      placeholder={register.placeholder}
                      className="form-control"
                    />
                  </div>
                ))}

                <div className="d-grid mt-2">
                  <button type="submit" className="btn-green">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <BottomLogo />
    </>
  );
};

export default Register;
