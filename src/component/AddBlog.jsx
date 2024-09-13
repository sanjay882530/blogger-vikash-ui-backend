import React, { useState, useEffect, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';
import axios from 'axios';
import LeftHeader from './LeftHeader';
import UserContext from '../context/UserContext';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [full_description, setFull_Description] = useState('');
  const [author, setAuthor] = useState('');
  const [image_url, setImage_Url] = useState('');
  const [message, setMessage] = useState({ text: '', color: '' });
  const [user_id, setUser_id] = useState('');
  const { user } = useContext(UserContext);
  const [username] = useState(user); // Set username from context initially

  // Fetch user_id when username is available
  const getUserId = async () => {
    try {
      if (username) {
        const response = await axios.post('/api/getUserId', { username });
        if (response.status === 200) {
          setUser_id(response.data.user_id);
          setMessage({ text: '', color: 'green' });
        } else {
          setMessage({ text: 'No record found!', color: 'red' });
        }
      }
    } catch (error) {
      setMessage({ text: 'An error occurred', color: 'red' });
    }
  };

  // Call getUserId when username is available
  useEffect(() => {
    getUserId();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user_id) {
        const response = await axios.post('/api/addBlog', {
          title,
          description,
          full_description,
          image_url,
          user_id,
          author
        });
        if (response.status === 200) {
          setMessage({ text: response.data.message, color: 'green' });
        } else {
          setMessage({ text: response.data.message, color: 'red' });
        }
      } else {
        setMessage({ text: 'User ID not available', color: 'red' });
      }
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'An error occurred', color: 'red' });
    }
  };

  return (
    <>
      <MDBContainer fluid className="d-flex vh-100 p-0 mt-0.5"> 
        <div className="d-flex w-100" style={{ gap: '20px' }}>
          {/* LeftHeader */}
          <div style={{ flex: '0 0 25%', padding: 0, margin: 0 }}>
            <LeftHeader />
          </div>

          {/* Form section */}
          <div style={{ flex: '1' }}>
            <form onSubmit={handleSubmit}>
              <MDBCard className="p-4 mt-2" style={{ maxWidth: '600px', width: '100%' }}>
                <MDBRow className="align-items-center">
                  <h2 className="text-uppercase text-center mb-5">Add Blog</h2>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Title"
                    size="lg"
                    id="form1"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Description"
                    size="lg"
                    id="form2"
                    textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Full Description"
                    size="lg"
                    id="form3"
                    textarea
                    rows={4}
                    value={full_description}
                    onChange={(e) => setFull_Description(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Author"
                    size="lg"
                    id="form4"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Image URL"
                    size="lg"
                    id="form5"
                    type="text"
                    value={image_url}
                    onChange={(e) => setImage_Url(e.target.value)}
                    required
                  />

                  <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-4" size="lg">
                    Add
                  </MDBBtn>

                  {message.text && <p style={{ color: message.color }}>{message.text}</p>}
                </MDBRow>
              </MDBCard>
            </form>
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default AddBlog;
