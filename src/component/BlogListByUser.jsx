import React, { useState, useEffect, useContext } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";
import UserContext from "../context/UserContext";
import LeftHeader from "./LeftHeader";
const VITE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://vikashblog.up.railway.app";
const BlogListByUser = () => {
  const [blogs, setBlogs] = useState([]);
  const [user_id, setUser_id] = useState("");
  const { user } = useContext(UserContext);
  const [username] = useState(user); // Set username from context initially

  const getUserId = async () => {
    if (!user_id && username) {
      try {
        const response = await axios.post(`${VITE_URL}/api/getUserId`, {
          username,
        });
        if (response.status === 200) {
          setUser_id(response.data.user_id);
        } else {
          console.log("No record found");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    }
  };

  useEffect(() => {
    if (username) {
      getUserId();
    }
  }, [username]); // Only run when username changes

  useEffect(() => {
    if (user_id) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.post(`${VITE_URL}/api/getBlogs`, {
            user_id,
          });
          setBlogs(response.data.blogs || []); // Set blogs or empty array
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
      fetchBlogs();
    }
  }, [user_id]); // Only run when user_id is available

  const handleSubmit = (id) => {
    // Save the blog ID to localStorage
    localStorage.setItem("blogId", id);
  };

  return (
    <>
      <div className="d-flex w-100" style={{ gap: "2px" }}>
        <div style={{ flex: "0 0 5%", padding: 0, margin: 0 }}>
          <LeftHeader />
        </div>
        <div style={{ flex: "1" }}></div>
        <MDBRow className="m-3 d-flex justify-content-center">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <MDBCol md="4" key={blog.id} className="mb-3">
                <MDBCard className="shadow-sm">
                  <MDBCardBody>
                    <MDBCardTitle>{blog.title}</MDBCardTitle>

                    <MDBCardText>{blog.description}</MDBCardText>
                    <MDBCardImage
                      src={blog.image_url}
                      position="top"
                      alt={blog.title}
                      style={{ width: "100%", height: "30%" }} // Ensures the image fills the container width
                    />

                    <MDBCardText>
                      <small className="text-muted">
                        Author: {blog.author}
                      </small>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <MDBCardText>No blogs available</MDBCardText>
          )}
        </MDBRow>
      </div>
    </>
  );
};

export default BlogListByUser;
