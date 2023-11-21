import { Link } from "react-router-dom";
import { featuredEvents } from "../constants";

const FeaturedEvents = ({ text }) => {
  return (
    <section className="grow-today">
      <div className="container">
        <div className="sub-title mb-1" id="grow-today">
          <span className="text-gradient-pink">{text}</span>
        </div>
        <div className="title">Featured Events</div>
        <div className="mt-5 row gap">
          {featuredEvents.map((event, index) => (
            <div className="col-lg-3 col-md-6 col-12" key={index}>
              <div className="card-grow h-100">
                <span className="badge-pricing">{event.pricing}</span>
                <img src={`/images/card-${index + 1}.png`} alt="" />
                <div className="card-content">
                  <div className="card-title">{event.title}</div>
                  <div className="card-subtitle">{event.subtitle}</div>
                  <div className="description">{event.description}</div>
                  <Link
                    to={`/events/${index + 1}`}
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
