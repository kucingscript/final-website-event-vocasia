import { Outlet } from "react-router-dom";

const AdminRoutes = ({ userRole }) => {
  return +userRole === 1 ? (
    <Outlet />
  ) : (
    <p>You do not have access to this page</p>
  );
};

export default AdminRoutes;
