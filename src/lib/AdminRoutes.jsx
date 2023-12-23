import { Link, Outlet } from "react-router-dom";

const AdminRoutes = ({ userRole }) => {
  return +userRole === 1 ? (
    <Outlet />
  ) : (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">403</h1>
        <span className="text-danger fs-3">Access Forbidden!</span>
        <p className="lead">Please, go back this way</p>
        <Link to={"/"} className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default AdminRoutes;
