import { Footer, Header, Hero } from "../components";

const About = () => {
  return (
    <>
      <Header>
        <Hero btnText={"About Us"} />
      </Header>

      <section className="brand-partner text-center" id="grow-today">
        <p>This website was developed by 5 superb people</p>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          <p className="fs-4">Kucingscript</p>
          <p className="fs-4">Bayu Ragil</p>
          <p className="fs-4">Irhasul Hafie</p>
          <p className="fs-4">Satria Rhama</p>
          <p className="fs-4">Triana Surya</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
