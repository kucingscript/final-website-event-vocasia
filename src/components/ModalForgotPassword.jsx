import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ShowNotification } from "../components";
import { auth } from "../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ModalForgotPassword = ({ show, handleClose }) => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, userEmail);
      ShowNotification({
        title: "Success",
        text: "Password reset sent. Check your email for instructions",
        icon: "info",
      }).then(() => handleClose());
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ margin: "-1rem 0" }}>
        <form>
          <div className="d-flex flex-column align-items-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={userEmail}
              className="form-control border-primary"
              placeholder="Type your email..."
              onChange={(event) => setUserEmail(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="btn" variant="primary" onClick={handleForgotPassword}>
          {isLoading ? "Sending... " : "Send"}
        </Button>
        <Button type="btn" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForgotPassword;
