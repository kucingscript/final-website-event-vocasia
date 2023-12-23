import { brandLogo } from "../constants";

const BottomLogo = () => {
  return (
    <section className="brand-partner pt-0 text-center bg-navy">
      <p>Events held by top & biggest global companies</p>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
        {brandLogo.map((logo, index) => (
          <img src={`images/${logo.src}`} alt={logo.alt} key={index} />
        ))}
      </div>
    </section>
  );
};

export default BottomLogo;
