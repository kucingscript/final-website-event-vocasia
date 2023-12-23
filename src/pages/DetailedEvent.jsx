import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FeaturedEvents,
  Footer,
  ShowNotification,
  Stories,
} from "../components";
import PagesHeader from "../components/PagesHeader";
import { detailedEvents } from "../constants";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { DB } from "../config/firebase";
import { dateFormatter } from "../utils";

const DetailedEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchEventById = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(DB, "events", id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const eventData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
        setEvent(eventData);
      } else {
        ShowNotification({
          title: "Event Not Found",
          text: "Oops! The requested event could not be found",
          icon: "error",
        });
        navigate("/");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEventById();
  }, [id]);

  return (
    <>
      <PagesHeader />

      {isLoading ? (
        <h4 className="text-center py-2">Fetching Event...</h4>
      ) : (
        <>
          <div className="preview-image bg-navy text-center">
            <img
              src={event.event_images}
              className="img-content"
              alt={event.event_title}
            />
          </div>

          <div className="details-content container">
            <div className="d-flex flex-wrap justify-content-lg-center gap">
              <div className="d-flex flex-column description">
                <div className="headline">{event.event_title}</div>
                <div className="event-details">
                  <h6>Event Details</h6>
                  <p className="details-paragraph">{event.event_details}</p>
                </div>
                <div className="keypoints">
                  {detailedEvents.map((event, index) => (
                    <div className="d-flex align-items-start gap-3" key={index}>
                      <img src="/icons/ic-check.svg" alt="icon" />
                      <span>{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex flex-column card-event">
                <h6>Your Speaker</h6>
                <div className="d-flex align-items-center gap-3 mt-3">
                  <div>
                    <div className="speaker-name">{event.speaker_name}</div>
                    <span className="occupation">
                      {event.speaker_occupation}
                    </span>
                  </div>
                </div>
                <hr />
                <h6>Get Ticket</h6>
                <div className="price my-3">
                  {event.event_price} K<span>/person</span>
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-marker.svg" alt="icon-evevnt" />
                  {event.event_place}
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-time.svg" alt="icon-evevnt" />
                  {event.event_time}
                </div>
                <div className="d-flex gap-3 align-items-center card-details">
                  <img src="/icons/ic-calendar.svg" alt="icon-evevnt" />
                  {dateFormatter(event.event_date)}
                </div>
                <Link to={`/events/checkout/${id}`} className="btn-green">
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      <FeaturedEvents text={"Next One"} />
      <Stories />
      <Footer />
    </>
  );
};

export default DetailedEvent;
