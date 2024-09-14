import React, { useContext } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBCard,
} from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
// import dotenv from "dotenv";
// dotenv.config();
// const VITE_URL =
//   process.env.VITE_BACKEND_URL || "https://vikashblog.up.railway.app";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", color: "" });
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [isSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUser(username);
    try {
      //const response = await axios.post(`${VITE_URL}/api/login`, {
      const response = await axios.post(
        "https://vikashblog.up.railway.app/api/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        setToken(response.data.token);
        setMessage({ text: "Login successful!", color: "green" });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage({
            text: error.response.data.message || "Invalid username or password",
            color: "red",
          });
        } else if (error.response.status === 500) {
          setMessage({
            text: "Server error. Please try again later.",
            color: "red",
          });
        } else {
          setMessage({ text: "An error occurred", color: "red" });
        }
      } else {
        setMessage({ text: "An unexpected error occurred", color: "red" });
      }
    }
  };

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column align-items-center">
        <MDBCard className="p-4 w-100" style={{ maxWidth: "500px" }}>
          <h3 style={{ textAlign: "center" }}>Welcome to Blogger Login</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Username"
              id="form1"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="d-flex justify-content-between mx-3 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#!">Forgot password?</a>
            </div>
            <MDBBtn className="w-100 mb-4" type="submit">
              Sign in
            </MDBBtn>
            {message.text && (
              <p style={{ color: message.color }}>{message.text}</p>
            )}
            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
              <p>or sign up with:</p>
              <div
                className="d-flex justify-content-between mx-auto"
                style={{ width: "60%" }}
              >
                <MDBBtn
                  disabled={isSubmitting}
                  pointer-events="none"
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn
                  disabled={isSubmitting}
                  tag="a"
                  color="none"
                  className="m-1 "
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn
                  disabled={isSubmitting}
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn
                  disabled={isSubmitting}
                  tag="a"
                  color="none"
                  className="m-1"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </div>
          </form>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default Login;
