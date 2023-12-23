const Hero = ({ btnText }) => {
  return (
    <>
      <div className="hero">
        <div className="hero-headline">
          Expand Your <span className="text-gradient-blue">Knowledge</span>{" "}
          <br className="d-none d-lg-block" />
          by <span className="text-gradient-pink">Joining</span> Our Greatest
          Events
        </div>
        <p className="hero-paragraph">
          Kami menyediakan berbagai acara terbaik untuk membantu
          <br className="d-none d-lg-block" />
          Anda dalam meningkatkan skills di berbagai bidang
        </p>
        <a href="#grow-today" className="btn-green">
          {btnText}
        </a>
      </div>

      <div className="d-flex flex-row flex-nowrap justify-content-center align-items-center gap-5 header-image">
        <img src="/images/1.png" alt="nusantarafest-1" className="img-1" />
        <img src="/images/2.png" alt="nusantarafest-2" className="img-2" />
        <img src="/images/1.png" alt="nusantarafest-3" className="img-1" />
      </div>
    </>
  );
};

export default Hero;
