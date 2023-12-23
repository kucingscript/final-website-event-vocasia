import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { dateFormatter } from "../utils";
import html2canvas from "html2canvas";

const ModalQR = ({ show, handleClose, order }) => {
  const { title, place, price, time, date, email, name, isPurchased } =
    order[0];

  const downloadQRCode = async () => {
    const qrCodeContainer = document.getElementById("qr-code-container");

    if (!qrCodeContainer) {
      console.error("QR Code container not found");
      return;
    }

    try {
      const canvas = await html2canvas(qrCodeContainer);
      const pngUrl = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `NusantaraFest - ${title}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error capturing QR code:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchased {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-auto" id="qr-code-container">
        <QRCode
          value={`
Order By: ${name},
Order Email: ${email},
isPurchased: ${isPurchased},
Event Title: ${title},
Event Place: ${place},
Event Price: ${price},
Event Time: ${time},
Event Date: ${dateFormatter(date)},
        `}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={downloadQRCode}>
          Download
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQR;
