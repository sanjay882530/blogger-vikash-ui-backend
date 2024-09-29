import React from "react";
import "./Circuits.css";
import { MDBContainer, MDBRow, MDBCol, MDBCard } from "mdb-react-ui-kit";
export default function Circuits() {
  return (
    <MDBContainer className="my-5">
      <MDBCard className="p-4">
        <MDBRow className="align-items-center">
          <h3 className="text-center text-blue-800">
            <strong>Circuits</strong>
          </h3>
          <img src="/img1.jpg" alt="circuits graph" className="circuits-img" />
          <p>
            A <b>circuit</b> refers to a closed loop or pathway that allows
            electric current to flow. The main components of a circuit usually
            include power sources (like batteries), loads (like resistors,
            capacitors, and inductors), and conductive paths (usually wires).
            Circuits can be classified into various types:
          </p>
          <ol>
            <li>
              <strong>Series Circuit:</strong>
              All components are connected end-to-end, forming a single path for
              the current to flow. The current is the same through all
              components, but the voltage is divided across each.
            </li>
            <li>
              <strong>Parallel Circuit:</strong>
              Components are connected across common points or junctions,
              providing multiple paths for current to flow. The voltage is the
              same across all components, but the current is divided among them.
            </li>
            <li>
              <strong>Combination Circuit: </strong>A mix of series and parallel
              connections.
            </li>
            <li>
              <strong>AC Circuit (Alternating Current): </strong>
              he current changes direction periodically. AC is typically used in
              power distribution.
            </li>
            <li>
              <strong>DC Circuit (Direct Current): </strong>
              The current flows in only one direction. DC is often used in
              low-voltage applications like batteries.
            </li>
          </ol>
          <ul>
            <h5>Key terms related to circuits:</h5>
            <li>
              <strong>Current (I): </strong> The flow of electric charge,
              measured in amperes (A).
            </li>
            <li>
              <strong>Voltage (V): </strong>The electrical potential difference
              between two points, measured in volts (V).
            </li>
            <li>
              <strong>Resistance (R): </strong> A measure of how much a
              component resists the flow of current, measured in ohms (Ω).
            </li>
            <li>
              <strong> Capacitance (C): </strong> The ability to store charge,
              measured in farads (F).
            </li>
            <li>
              <strong> Inductance (L): </strong>The ability to induce an
              electromotive force (EMF) due to a change in current, measured in
              henries (H).
            </li>
          </ul>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
