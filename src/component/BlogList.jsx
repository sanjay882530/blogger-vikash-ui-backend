import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios"; // Import axios
import { Link } from "react-router-dom";
const VITE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://vikashblog.up.railway.app";
const BlogList = ({}) => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs only when the component mounts
  useEffect(() => {
    const fetchBlogs = () => {
      axios
        .post(`${VITE_URL}/api/getBlogs`)
        .then((response) => {
          setBlogs(response.data.blogs || []);
        })
        .catch((error) => {
          console.error("There was an error fetching the blogs!", error);
        });
    };
    fetchBlogs();
  }, []);

  const handleSubmit = (id) => {
    localStorage.setItem("blogId", id);
  };

  return (
    <MDBRow className="m-3 d-flex justify-content-center">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <MDBCol md="4" key={blog.id} className="mb-3">
            <MDBCard className="shadow-sm">
              <MDBCardImage
                src={blog.image_url}
                position="top"
                alt={blog.title}
              />
              <MDBCardBody>
                <MDBCardTitle>{blog.title}</MDBCardTitle>
                <MDBCardText>{blog.description}</MDBCardText>
                <MDBCardText>
                  <small className="text-muted">Author: {blog.author}</small>
                </MDBCardText>
                {blog?.id === blog.user_id && (
                  <MDBBtn
                    onClick={() => handleSubmit(blog.id)} // Pass blog.id when clicked
                    color="primary"
                    size="sm"
                  >
                    <Link
                      to={`/blog/${blog.id}`}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {" "}
                      Read More{" "}
                    </Link>
                  </MDBBtn>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))
      ) : (
        <MDBCardText>No blogs available</MDBCardText>
      )}
    </MDBRow>
  );
};

export default BlogList;
