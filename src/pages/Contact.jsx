import { Footer, PagesHeader } from "../components";

const Contact = () => {
  return (
    <>
      <PagesHeader />
      <section className="login header bg-navy">
        <div className="container">
          <div className="d-flex flex-column align-items-center hero gap-5">
            <div>
              <div className="hero-headline text-start">Contact Us</div>
            </div>
            <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
              <div className="d-flex flex-column align-items-start">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="vocasia@gmail.com"
                />
              </div>
              <div className="d-flex flex-column ">
                <div className="form-floating">
                  <textarea
                    className="form-control textarea"
                    id="floatingTextarea2"
                    placeholder="Leave a comment here"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2" className="text-secondary">
                    Leave a comment here
                  </label>
                </div>
              </div>
              <div className="d-grid mt-2 gap-4">
                <button type="submit" className="btn-green">
                  Send Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
