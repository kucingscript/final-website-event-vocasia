import { useEffect, useState } from "react";
import PagesHeader from "../components/PagesHeader";
import { Footer, ModalQR, ShowNotification } from "../components";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { DB } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { dateFormatter } from "../utils";
import { useUserCredentials } from "../context";
import Swal from "sweetalert2";
import moment from "moment";

const EventCheckout = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [, , , userCredentials] = useUserCredentials();

  const navigate = useNavigate();
  const currentDate = moment().format("YYYY-MM-DD");

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

        if (
          moment(eventData.event_date).isBefore(currentDate) ||
          moment(eventData.event_date).isSame(currentDate)
        ) {
          ShowNotification({
            title: "Event Warning",
            text: "We're sorry, but this event has already taken place and is no longer available.",
            icon: "warning",
          });
          navigate("/");
        }
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

  const fetchOrders = async () => {
    try {
      if (!userCredentials || !userCredentials.email || !id) {
        return;
      }

      const ordersQuery = query(
        collection(DB, "orders"),
        where("email", "==", userCredentials.email),
        where("eventId", "==", id)
      );

      const ordersQuerySnapshot = await getDocs(ordersQuery);
      const orderData = ordersQuerySnapshot.docs.map((doc) => doc.data());
      setOrder(orderData);
    } catch (error) {
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

  useEffect(() => {
    fetchOrders();
  }, [userCredentials?.email, id]);

  const handleCheckout = async () => {
    try {
      const shouldDelete = await Swal.fire({
        title: "Confirm Event Checkout",
        text: "Do you really want to proceed with the checkout process?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Checkout",
      });

      if (!shouldDelete.isConfirmed) {
        return;
      }

      await addDoc(collection(DB, "orders"), {
        eventId: event.id,
        title: event.event_title,
        place: event.event_place,
        price: event.event_price,
        time: event.event_time,
        date: event.event_date,
        email: userCredentials.email,
        name: userCredentials.firstname + " " + userCredentials.lastname,
        isPurchased: false,
        isCheckout: true,
        timestamp: serverTimestamp(),
      });

      ShowNotification({
        title: "Payment Success",
        text: "Your payment was successful. Please wait for the admin to verify the transaction.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <PagesHeader />
      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Invest In Yourself</div>

          {isLoading ? (
            <h4 className="text-center py-3">Fetching Event...</h4>
          ) : (
            <>
              <div className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
                <img
                  src={event.event_images}
                  className="event-image"
                  alt={event.event_title}
                />
                <div className="d-flex flex-column gap-2">
                  <h5>{event.event_title}</h5>

                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-marker-white.svg" alt="event place" />
                    <span>{event.event_place}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-time-white.svg" alt="event time" />
                    <span>{event.event_time}</span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <img src="/icons/ic-calendar-white.svg" alt="event date" />
                    <span>{dateFormatter(event.event_date)}</span>
                  </div>
                </div>
                <div className="total-price">{event.event_price} K</div>
              </div>

              <div className="d-flex justify-content-center">
                {order[0]?.isPurchased ? (
                  <>
                    <button onClick={handleShow} className="btn-green">
                      Generate QR Code
                    </button>
                    <ModalQR
                      show={show}
                      handleClose={handleClose}
                      order={order}
                    />
                  </>
                ) : (
                  <button
                    className="btn-green"
                    onClick={handleCheckout}
                    disabled={order[0]?.isCheckout}
                    style={{ cursor: order[0]?.isCheckout && "not-allowed" }}
                  >
                    {order[0]?.isCheckout
                      ? "Admin Verification in Progress"
                      : "Checkout"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventCheckout;
