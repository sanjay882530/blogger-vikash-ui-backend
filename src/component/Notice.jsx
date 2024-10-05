import React from "react";
import { MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";
import "./Notice.css";
function Notice() {
  return (
    <MDBContainer className="my-6 cont-styles">
      <MDBCard className="p-4 card-color">
        <h3> Notice Board</h3>
        <marquee direction="left">
          The new electrical batch recently started.
        </marquee>
        <marquee direction="right">
          This week, a circuit test will be conducted.
        </marquee>
        <marquee direction="left">
          This week, a circuit test will be conducted.
        </marquee>
        <marquee direction="right">
          This week, a circuit test will be conducted.
        </marquee>
      </MDBCard>
    </MDBContainer>
  );
}

export default Notice;
