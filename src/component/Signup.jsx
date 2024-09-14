import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const VITE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://vikashblog.up.railway.app";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswrodError] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // For modal visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling the button
  const navigate = useNavigate();

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable button after form is submitted
    try {
      const response = await axios.post(`${VITE_URL}/api/signup`, {
        username,
        password,
        email,
      });
      if (response.status === 201) {
        setMessage({ text: response.data.message, color: "green" });
        setModalOpen(true); // Open modal on success
        setTimeout(() => {
          setIsSubmitting(false); // Re-enable button after timeout
          navigate("/login");
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        setMessage({ text: response.data.message, color: "red" });
        setIsSubmitting(false); // Re-enable button on error
      }
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "An error occurred",
        color: "red",
      });
      setIsSubmitting(false); // Re-enable button on error
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.post(`${VITE_URL}api/checkEmail`, { email });
      if (response.status === 200) {
        setEmailError("");
      } else {
        setEmailError(response.data.message);
      }
    } catch (error) {
      setEmailError(error.response?.data?.message || "An error occurred");
    }
  };

  const checkUsername = async () => {
    try {
      const response = await axios.post(`${VITE_URL}/api/checkUserName`, {
        username,
      });
      if (response.status === 200) {
        setUsernameError("");
      } else {
        setUsernameError(response.data.message);
      }
    } catch (error) {
      setUsernameError(error.response?.data?.message || "An error occurred");
    }
  };

  const checkPassword = async () => {
    try {
      const pass = password === retypePassword;
      if (pass) {
        setPasswrodError("");
      } else {
        setPasswrodError("Passwords must be the same");
      }
    } catch (error) {
      setPasswrodError("An error occurred");
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center w-60"
    >
      <form onSubmit={handleSubmit}>
        <MDBCard className="m-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>

          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            size="lg"
            id="form1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={checkUsername} // Check username on blur
            required
          />
          {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}

          <MDBInput
            wrapperClass="mb-4"
            label="Your Email"
            size="lg"
            id="form2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmail} // Check email on blur
            required
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}

          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            size="lg"
            id="form3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <MDBInput
            wrapperClass="mb-4"
            label="Repeat your password"
            size="lg"
            id="form4"
            type="password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            onBlur={checkPassword}
            required
          />
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

          <div className="d-flex flex-row justify-content-center mb-4">
            <MDBCheckbox
              name="flexCheck"
              id="flexCheckDefault"
              label="I agree all statements in Terms of service"
            />
          </div>

          <MDBBtn
            type="submit"
            className="mb-4 w-100 gradient-custom-4"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Register"}{" "}
            {/* Change button text */}
          </MDBBtn>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {message.text && (
            <p style={{ color: message.color }}>{message.text}</p>
          )}
        </MDBCard>
      </form>

      {/* Modal for success message */}
      <MDBModal show={modalOpen} setShow={setModalOpen} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Success</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{ color: "green" }}>
              {message.text}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </MDBContainer>
  );
}

export default Signup;
