import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBContainer,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const id = localStorage.getItem('blogId');
 
  console.log('blog id blog component:', id);

  // Fetch blogs when the component mounts or when the id changes
  useEffect(() => {
    const fetchBlogs = () => {
      console.log('id:', id);
      axios.get(`/api/getBlogById/${id}`)  // Use template literal to insert id into URL
        .then(response => {
          setBlogs(response.data.blogs || []); // Handle response data properly
        })
        .catch(error => {
          console.error('There was an error fetching the blogs!', error);
        });
    };

    if (id) {
      fetchBlogs(); // Call fetchBlogs only if id is present
    }
  }, [id]);  // Depend on id to trigger the effect when id changes

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-70">
      <MDBRow className="w-100">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <MDBCol md="12" key={blog.id} className="mb-3"> {/* Full width column */}
              <MDBCard className="shadow-sm">
              <MDBCardImage
                src={blog.image_url}
                position="top"
                alt={blog.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }} 
              />

                <MDBCardBody>
                  <MDBCardTitle>{blog.title}</MDBCardTitle>
                  <MDBCardText>{blog.full_description}</MDBCardText>
                  <MDBCardText>
                    <small className="text-muted">Author: {blog.author}</small>
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))
        ) : (
          <MDBCardText>No blogs available</MDBCardText>
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default Blog;
