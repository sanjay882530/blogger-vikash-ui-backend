import React from "react";
import "./ImageCard.css"; // Import the CSS file for styling
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
function ImageCard() {
  return (
    <MDBContainer className="my-5 gradient-bg">
      <MDBCard className="p-1 gradient-bg">
        <MDBRow className="align-items-center">
          {/* Image on one side */}
          {/* <MDBCol md="3">
            <div className="circle">
              {
                <img
                  src="home.jpg" // Replace with your image URL
                  alt="Description of Image"
                  className="circle-image"
                />
              }
            </div>
          </MDBCol> */}

          <MDBCol className="textcolumn">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"></div>
            <br />
            <p className="text-s">
              I am Vikash Kumar Verma, working as a Teaching & Curriculum
              Development: Deliver lectures and hands-on labs in subjects such
              as circuit design, embedded systems, signal processing,
              telecommunications, and semiconductor devices. Develop and update
              curriculum to ensure it aligns with the latest industry trends and
              academic standards.
            </p>
            <p className="text-s">
              Research & Development: Lead and contribute to research
              initiatives in electronics and related fields, such as
              microelectronics, VLSI design, IoT, and renewable energy systems.
              Guide graduate and postgraduate students in their research
              projects.
            </p>
            <p className="text-s">
              {" "}
              Mentorship & Supervision: Mentor undergraduate and postgraduate
              students, providing academic guidance and career development
              advice.{" "}
            </p>
            <p className="text-s">
              Supervise doctoral and master’s students in their thesis work.
              Collaboration & Networking: Collaborate with industry experts,
              participate in conferences, publish research papers, and secure
              research funding through grants and partnerships with industry and
              academic institutions.
            </p>
            <p className="text-s">
              Innovation in Teaching: Utilize modern teaching techniques, such
              as blended learning, flipped classrooms, and online platforms, to
              enhance student engagement and learning outcomes. Administrative
              Duties: Participate in departmental and university-level
              committees, contribute to accreditation processes, and assist in
              the strategic planning of the department.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ImageCard;
