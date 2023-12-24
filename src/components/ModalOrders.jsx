import { Button, Card, Modal } from "react-bootstrap";
import { useUserCredentials } from "../context";
import { dateFormatter } from "../utils";
import { useNavigate } from "react-router-dom";
import { CheckLg } from "react-bootstrap-icons";

const ModalOrders = ({ show, handleClose }) => {
  const navigate = useNavigate("");
  const [, , , userCredentials, , orders] = useUserCredentials();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{userCredentials.firstname} Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order, index) => {
            const { title, place, price, time, date, isPurchased } = order;
            return (
              <Card key={index} className="mt-1">
                <Card.Header>Order#{index + 1}</Card.Header>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    {place}, {dateFormatter(date)} @ {time}
                  </Card.Text>
                  <Card.Text>Price : {price}K</Card.Text>
                  <Card.Text>
                    Order Status :{" "}
                    {isPurchased ? (
                      <>
                        <span>Already Purchased </span>
                        <CheckLg className="text-success" />
                      </>
                    ) : (
                      "Not Purchased Yet"
                    )}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/events/checkout/${order.eventId}`);
                      handleClose();
                    }}
                  >
                    View Detail
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p>No orders available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button type="btn" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOrders;
