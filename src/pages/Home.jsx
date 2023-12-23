import {
  Brand,
  FeaturedEvents,
  Header,
  Hero,
  Stories,
  Footer,
} from "../components";

const Home = () => {
  return (
    <>
      <Header>
        <Hero btnText={"Browse Now"} />
      </Header>
      <Brand />
      <FeaturedEvents text={"Grow Today"} />
      <Stories />
      <Footer />
    </>
  );
};

export default Home;
