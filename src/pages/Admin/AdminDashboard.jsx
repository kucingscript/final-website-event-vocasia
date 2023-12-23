import { Link, useNavigate } from "react-router-dom";
import "../Admin/style/index.css";
import React from "react";
import {
  Calendar2Check,
  CardText,
  CartCheck,
  HouseDoorFill,
  PersonCircle,
} from "react-bootstrap-icons";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: "#f4f7fd",
        display: "grid",
        minHeight: "100vh",
        placeContent: "center",
        padding: "2rem 0 1rem 0",
      }}
    >
      <div className="container">
        <button
          className="btn btn-primary btn-sm mb-2"
          onClick={() => navigate("/")}
        >
          <HouseDoorFill className="mb-1" /> Back to Home
        </button>

        <div className="row">
          <div
            className="col-lg-4"
            onClick={() => navigate("/admin/users")}
            style={{ cursor: "pointer" }}
          >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title pt-2">Users Management</h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-primary">
                      <span className="widget-49-date-day">
                        <PersonCircle />
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">
                        NusantaraFest Access Control
                      </span>
                      <span className="widget-49-meeting-time">Eventning</span>
                    </div>
                  </div>
                  <ol className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item">
                      <span>Read Users</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Delete User</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Live Query</span>
                    </li>
                  </ol>
                  <div className="widget-49-meeting-action">
                    <Link
                      to={"/admin/users"}
                      className="btn btn-sm btn-flash-border-primary"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-lg-4"
            onClick={() => navigate("/admin/events")}
            style={{ cursor: "pointer" }}
          >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title pt-2">Events Management</h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-warning">
                      <span className="widget-49-date-day">
                        <Calendar2Check />
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">
                        NusantaraFest Events Planning
                      </span>
                      <span className="widget-49-meeting-time">Eventning</span>
                    </div>
                  </div>
                  <ol className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item">
                      <span>Create Event</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Update Event</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Delete Event</span>
                    </li>
                  </ol>
                  <div className="widget-49-meeting-action">
                    <Link
                      to={"/admin/events"}
                      className="btn btn-sm btn-flash-border-warning"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-lg-4"
            onClick={() => navigate("/admin/orders")}
            style={{ cursor: "pointer" }}
          >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title pt-2">Orders Management</h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-success">
                      <span className="widget-49-date-day">
                        <CartCheck />
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">
                        NusantaraFest Orders Tracking
                      </span>
                      <span className="widget-49-meeting-time">Eventning</span>
                    </div>
                  </div>
                  <ol className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item">
                      <span>Update Order</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Delete Order</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Live Query</span>
                    </li>
                  </ol>
                  <div className="widget-49-meeting-action">
                    <Link
                      to={"/admin/orders"}
                      className="btn btn-sm btn-flash-border-warning"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-lg-4"
            onClick={() => navigate("/admin/comments")}
            style={{ cursor: "pointer" }}
          >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-title pt-2">Comments Management</h5>
              </div>
              <div className="card-body pt-0">
                <div className="widget-49">
                  <div className="widget-49-title-wrapper">
                    <div className="widget-49-date-info">
                      <span className="widget-49-date-day">
                        <CardText />
                      </span>
                    </div>
                    <div className="widget-49-meeting-info">
                      <span className="widget-49-pro-title">
                        NusantaraFest Users Feedback
                      </span>
                      <span className="widget-49-meeting-time">Eventning</span>
                    </div>
                  </div>
                  <ol className="widget-49-meeting-points">
                    <li className="widget-49-meeting-item">
                      <span>Read Comments</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Delete Comment</span>
                    </li>
                    <li className="widget-49-meeting-item">
                      <span>Live Query</span>
                    </li>
                  </ol>
                  <div className="widget-49-meeting-action">
                    <Link
                      to={"/admin/comments"}
                      className="btn btn-sm btn-flash-border-success"
                    >
                      View All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
