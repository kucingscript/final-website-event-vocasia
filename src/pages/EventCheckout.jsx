import { useState } from "react";
import PagesHeader from "../components/PagesHeader";
import { Footer, ModalQR } from "../components";

const EventCheckout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <PagesHeader />
      <section className="bg-navy">
        <div className="checkout container">
          <div className="text-center checkout-title">Invest In Yourself</div>

          <div className="event-details container d-flex flex-wrap justify-content-lg-center align-items-center gap-5">
            <img
              src="/images/details-image.png"
              className="event-image"
              alt=""
            />
            <div className="d-flex flex-column gap-2">
              <h5>
                Start Your Design Career <br className="d-none d-md-block" />
                With Design Sprint
              </h5>

              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-marker-white.svg" alt="" />
                <span>Gowork, Bandung</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-time-white.svg" alt="" />
                <span>15.00 PM WIB</span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <img src="/icons/ic-calendar-white.svg" alt="" />
                <span>22 Agustus 2022</span>
              </div>
            </div>
            <div className="total-price">$2,980</div>
          </div>

          <div className="d-flex justify-content-center">
            <button onClick={handleShow} className="btn-green">
              Generate QR
            </button>
            <ModalQR show={show} handleClose={handleClose} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventCheckout;
