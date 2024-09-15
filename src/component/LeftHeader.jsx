import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function LeftHeader() {
  const [openNav, setOpenNav] = useState(false);

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <MDBNavbar expand="lg" dark bgColor="dark" className="mb-3">
      <MDBContainer fluid>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <Link to="/dashboard" className="nav-link text-white">
                Dashboard
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/addBlog" className="nav-link text-white">
                Add Blog
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/blogs" className="nav-link text-white">
                View Blog
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/blogById" className="nav-link text-white">
                Edit Blog
              </Link>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default LeftHeader;
