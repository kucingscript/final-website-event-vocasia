import { useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { eventId } = useParams();

  return <div>UpdateEvent {eventId}</div>;
};

export default UpdateEvent;
