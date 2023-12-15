import { useNavigate, useParams } from "react-router-dom";
import { ShowNotification } from "../../../components";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { DB, storage } from "../../../config/firebase";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { createEvents, requiredFields } from "../../../constants";
import { HouseDoorFill, PencilFill, TrashFill } from "react-bootstrap-icons";
import { imageValidation } from "../../../utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const [events, setEvents] = useState({});
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);
  const navigate = useNavigate();

  const fetchEventData = async () => {
    try {
      const docRef = doc(DB, "events", eventId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const eventData = docSnapshot.data();
        setEvents(eventData);
      }
    } catch (error) {
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setEvents((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const isValid = imageValidation(selectedFile);

    if (isValid) {
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (requiredFields.some((field) => !events[field])) {
        ShowNotification({
          title: "Form submissions error",
          text: "Oops, it seems like there are missing fields",
          icon: "error",
        });
        return;
      }

      const eventDocRef = doc(collection(DB, "events"), eventId);
      await updateDoc(eventDocRef, events);

      setEvents("");
      navigate("/admin/events");
      ShowNotification({
        title: "Event updated successfully",
        text: "New event has been successfully updated",
        icon: "success",
      });
    } catch (error) {
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const uploadFiles = () => {
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentage(progress);
        },
        (error) => {
          console.error("Error uploading images", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setEvents((prev) => ({ ...prev, event_images: downloadURL }));
          });
        }
      );
    };
    file && uploadFiles();
  }, [file]);

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center my-4">
        <Col md={8} className="shadow pt-3 pb-4 px-md-3">
          <h2 className="text-center pb-2">Update Event</h2>
          <form onSubmit={handleFormSubmit}>
            {createEvents.map((event) =>
              event.type === "file" ? (
                <div key={event.id} className="col col-md-6">
                  <img
                    src={events[event.id]}
                    alt={events[event.id]}
                    className="img-thumbnail"
                  />
                  <input
                    id={event.id}
                    type="file"
                    className="form-control my-2"
                    defaultValue={events[event.id]}
                    placeholder={event.label}
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="form-floating mb-2" key={event.id}>
                  <input
                    id={event.id}
                    type={event.type}
                    defaultValue={events[event.id]}
                    className="form-control"
                    placeholder={event.label}
                    onChange={handleInputChange}
                  />
                  <label>{event.label}</label>
                </div>
              )
            )}

            <div className="d-flex gap-2 pt-3 flex-wrap">
              <button
                className="btn btn-success d-flex align-items-center gap-1"
                type="button"
                onClick={() => navigate("/admin/events")}
              >
                <HouseDoorFill /> Back to Admin
              </button>
              <button
                className={`btn btn-primary d-flex align-items-center gap-1 ${
                  percentage !== null && percentage < 100 ? "disabled" : ""
                }`}
                type="submit"
              >
                <PencilFill /> Update Event
              </button>
              <button
                className="btn btn-danger d-flex align-items-center gap-1"
                onClick={() => setEvents("")}
                type="button"
              >
                <TrashFill /> Clear Event
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateEvent;
