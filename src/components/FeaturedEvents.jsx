import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShowNotification } from "../components";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { DB } from "../config/firebase";
import { dateFormatter } from "../utils";
import moment from "moment";

const FeaturedEvents = ({ text }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [eventsLimit, setEventsLimit] = useState(false);

  const navigate = useNavigate();
  const currentDate = moment().format("YYYY-MM-DD");

  const fetchEventsData = async () => {
    try {
      setIsLoading(true);
      const customQuery = query(
        collection(DB, "events"),
        limit(eventsLimit ? undefined : 4)
      );
      const querySnapshot = await getDocs(customQuery);
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
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
    fetchEventsData();
  }, [eventsLimit]);

  const handleEventClick = (id, event_date) => {
    if (
      moment(event_date).isBefore(currentDate) ||
      moment(event_date).isSame(currentDate)
    ) {
      ShowNotification({
        title: "Event Warning",
        text: "We're sorry, but this event has already taken place and is no longer available.",
        icon: "warning",
      });
      return;
    }
    navigate(`/events/${id}`);
  };

  return (
    <section className="grow-today">
      <div className="container">
        <div className="sub-title mb-1" id="grow-today">
          <span className="text-gradient-pink">{text}</span>
        </div>
        <div className="title">Featured Events</div>
        <div className="mt-5 row gap">
          {isLoading ? (
            <h4>Fetching Events...</h4>
          ) : (
            events.map((event, index) => {
              const {
                event_title,
                event_price,
                event_place,
                event_date,
                event_images,
                speaker_occupation,
              } = event;
              return (
                <div
                  className="col-lg-3 col-md-6 col-12"
                  key={index}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-grow h-100">
                    <span className="badge-pricing">{event_price} K</span>
                    <img src={event_images} alt={event_title} />
                    <div className="card-content">
                      <div className="card-title">{event_title}</div>
                      <div className="card-subtitle">{speaker_occupation}</div>
                      <div className="description">
                        {event_place}, {dateFormatter(event_date)}
                      </div>
                      <div
                        onClick={() => handleEventClick(event.id, event_date)}
                        className="stretched-link"
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          <div className="d-flex justify-content-center">
            <button
              className="btn-green"
              onClick={() => setEventsLimit(!eventsLimit)}
            >
              {eventsLimit ? "Hide" : "Show All"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
