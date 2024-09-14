import React from "react";
import { MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function LeftHeader() {
  return (
    <div
      style={{
        left: 0,
        top: 60,
        height: "100%",
        width: "200px",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Link to="/dashboard">
        <h5 className="p-4"> Blog Modules</h5>
      </Link>
      <MDBRow className="d-flex flex-column align-items-start">
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link
              to="/addBlog"
              style={{ color: "white", textDecoration: "none" }}
            >
              <MDBBtn color="primary" className="w-100">
                Add Blog
              </MDBBtn>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/blogs"
              style={{ color: "white", textDecoration: "none" }}
            >
              <MDBBtn color="primary" className="w-100">
                View Blog
              </MDBBtn>
            </Link>
          </li>
          <li className="mb-3">
            <Link
              to="/blogById"
              style={{ color: "white", textDecoration: "none" }}
            >
              <MDBBtn color="primary" className="w-100">
                Edit Blog
              </MDBBtn>
            </Link>
          </li>
        </ul>
      </MDBRow>
    </div>
  );
}

export default LeftHeader;
