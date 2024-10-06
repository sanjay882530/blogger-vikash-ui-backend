import React from "react";
import { MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";
import "./Notice.css";
function Notice() {
  return (
    <MDBContainer className="my-6 cont-styles ">
      <MDBCard className="p-4 card-color gradient-bg">
        <h3> Notice Board</h3>
        <marquee direction="left" className="left-dir">
          The new electrical batch recently started.
        </marquee>
        <marquee direction="right" className="right-dir">
          This week, a circuit test will be conducted.
        </marquee>
        <marquee direction="left" className="left-dir">
          This week, a circuit test will be conducted.
        </marquee>
        <marquee direction="right" className="right-dir">
          This week, a circuit test will be conducted.
        </marquee>
      </MDBCard>
    </MDBContainer>
  );
}

export default Notice;
