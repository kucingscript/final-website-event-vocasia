import { Link, useParams } from "react-router-dom";
import { FeaturedEvents, Footer, Stories } from "../components";
import PagesHeader from "../components/PagesHeader";
import { detailedEvents } from "../constants";
import { useEffect } from "react";

const DetailedEvent = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <PagesHeader />

      <div className="preview-image bg-navy text-center">
        <img src="/images/details-image.png" className="img-content" alt="" />
      </div>

      <div className="details-content container">
        <div className="d-flex flex-wrap justify-content-lg-center gap">
          <div className="d-flex flex-column description">
            <div className="headline">
              Start Your Design Career With Design Sprint {id}
            </div>
            <div className="event-details">
              <h6>Event Details</h6>
              <p className="details-paragraph">
                Most realtors and investors are using Social Media (Facebook and
                Google)
                <b>ineffectively because</b> they don't know what they're doing
                or to start. They spend hours and hours trying different things
                and getting nowhere. This makes them feel like giving up on
                marketing altogether.
              </p>
            </div>
            <div className="keypoints">
              {detailedEvents.map((event, index) => (
                <div className="d-flex align-items-start gap-3" key={index}>
                  <img src="/icons/ic-check.svg" alt="" />
                  <span>{event.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex flex-column card-event">
            <h6>Your Speaker</h6>
            <div className="d-flex align-items-center gap-3 mt-3">
              <div>
                <div className="speaker-name">Shayna Putri</div>
                <span className="occupation">Designer</span>
              </div>
            </div>
            <hr />
            <h6>Get Ticket</h6>
            <div className="price my-3">
              $2,980<span>/person</span>
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-marker.svg" alt="" /> Gowork, Bandung
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-time.svg" alt="" /> 15.00 PM WIB
            </div>
            <div className="d-flex gap-3 align-items-center card-details">
              <img src="/icons/ic-calendar.svg" alt="" /> 22 Agustus 2022
            </div>
            <Link to={`/events/checkout/${id}`} className="btn-green">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      <FeaturedEvents text={"Next One"} />
      <Stories />
      <Footer />
    </>
  );
};

export default DetailedEvent;
