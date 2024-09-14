import React from "react";
import "./ImageCard.css"; // Import the CSS file for styling
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
function ImageCard() {
  return (
    <MDBContainer className="my-5">
      <MDBCard className="p-4">
        <MDBRow className="align-items-center">
          {/* Image on one side */}
          <MDBCol md="3">
            <div className="circle">
              {
                <img
                  src="home.jpg" // Replace with your image URL
                  alt="Description of Image"
                  className="circle-image"
                />
              }
            </div>
          </MDBCol>

          <MDBCol md="6" className="textcolumn">
            <br />
            <br />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"></div>
            <br />
            <p className="text-s">
              I am Vikash Kumar Verma, and I work as a Lectural, specializing in
              Electronic.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ImageCard;
