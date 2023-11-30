import Swal from "sweetalert2";

const ShowNotification = ({ title, text, icon }) => {
  return Swal.fire({
    title,
    text,
    icon,
  });
};

export default ShowNotification;
