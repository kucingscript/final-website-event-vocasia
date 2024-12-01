import { Footer, Header, Hero } from "../components";

const About = () => {
  return (
    <>
      <Header>
        <Hero btnText={"About Us"} />
      </Header>

      <section className="brand-partner text-center" id="grow-today">
        <p>This website was developed by some extraordinary people</p>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          <p className="fs-4">Lorem</p>
          <p className="fs-4">Ipsum</p>
          <p className="fs-4">Dolor</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
