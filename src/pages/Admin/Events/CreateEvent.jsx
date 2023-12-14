import { Col, Container, Row } from "react-bootstrap";
import { createEvents } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Calendar2PlusFill, GearFill, TrashFill } from "react-bootstrap-icons";
import { ShowNotification } from "../../../components/";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { DB, storage } from "../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState({});
  const [file, setFile] = useState("");
  const [percentage, setPercentage] = useState(null);

  const handleInputChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    setDatas({
      ...datas,
      [id]: value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        ShowNotification({
          title: "Error Uploading Images",
          text: "Please select a valid image file (JPEG, PNG)",
          icon: "error",
        });
        return;
      }
    }

    const maxSizeInBytes = 2 * 1024 * 1024;
    if (selectedFile.size > maxSizeInBytes) {
      ShowNotification({
        title: "Error Uploading Images",
        text: "File size exceeds the maximum limit of 5 MB",
        icon: "error",
      });
      return;
    }

    setFile(selectedFile);
  };

  const requiredFields = [
    "event_title",
    "event_details",
    "event_price",
    "event_place",
    "event_time",
    "event_date",
    "event_images",
    "speaker_name",
    "speaker_occupation",
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (requiredFields.some((field) => !datas[field])) {
        ShowNotification({
          title: "Form submissions error",
          text: "Oops, it seems like there are missing fields",
          icon: "error",
        });
        return;
      }
      await addDoc(collection(DB, "events"), {
        ...datas,
        timestamp: serverTimestamp(),
      });
      setDatas("");
      navigate("/admin/events");
      ShowNotification({
        title: "Event created successfully",
        text: "New event has been successfully created",
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
            setDatas((prev) => ({ ...prev, event_images: downloadURL }));
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
          <h2 className="text-center pb-2">Create Event</h2>
          <form onSubmit={handleFormSubmit}>
            {createEvents.map((event) => (
              <div className="form-floating mb-2" key={event.id}>
                <input
                  id={event.id}
                  type={event.type}
                  className="form-control"
                  placeholder={event.label}
                  onChange={
                    event.type === "file" ? handleFileChange : handleInputChange
                  }
                />
                <label>{event.label}</label>
              </div>
            ))}

            <div className="d-flex gap-2 pt-3 ">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => navigate("/admin/events")}
              >
                <GearFill /> Back to Admin
              </button>
              <button
                className={`btn btn-primary ${
                  percentage !== null && percentage < 100 ? "disabled" : ""
                }`}
                type="submit"
              >
                <Calendar2PlusFill /> Create Event
              </button>
              <button className="btn btn-danger" type="reset">
                <TrashFill /> Clear Event
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
