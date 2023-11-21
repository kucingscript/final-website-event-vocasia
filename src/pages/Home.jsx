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
        <Hero />
      </Header>
      <Brand />
      <FeaturedEvents text={"Grow Today"} />
      <Stories />
      <Footer />
    </>
  );
};

export default Home;
