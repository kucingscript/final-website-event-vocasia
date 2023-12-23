import { brandLogo } from "../constants";

const Brand = () => {
  return (
    <section className="brand-partner text-center">
      <p>Events held by top & biggest global companies</p>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        {brandLogo.map((logo, index) => (
          <img src={`images/${logo.src}`} alt={logo.alt} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Brand;
