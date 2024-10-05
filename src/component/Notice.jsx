import React from "react";
import { MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";
import "./Notice.css";
function Notice() {
  return (
    <MDBContainer className="my-6 cont-styles">
      <MDBCard className="p-5">
        <MDBRow className="align-items-center">
          <h3> NOTICE</h3>
          <marquee direction="left">
            The new electrical batch recently started.
          </marquee>
          <marquee direction="right">
            This week, a circuit test will be conducted.
          </marquee>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Notice;
