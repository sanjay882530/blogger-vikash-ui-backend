import React, { useState, useContext, useEffect } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  const handleLinkClick = () => {
    setOpenNav(false); // Close the menu when a link is clicked
  };

  return (
    <MDBNavbar expand="lg" bgColor="dark" dark>
      <MDBContainer fluid>
        <Link className="navbar-brand" to="/">
          {/* <img src="/sanjay.png" alt="Logo" width={200} height={25} /> */}
          <h3>
            <strong>Electronic Tech </strong>
          </h3>
        </Link>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNav}>
          <MDBNavbarNav right fullWidth={false}>
            <MDBNavbarItem>
              <MDBNavbarLink
                aria-current="page"
                href="/"
                onClick={handleLinkClick}
              >
                <strong className="text-light">Home</strong>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/subjects" onClick={handleLinkClick}>
                <strong className="text-light">Subjects</strong>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/viewBlogs" onClick={handleLinkClick}>
                <strong className="text-light">Blog</strong>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? (
                <MDBNavbarLink
                  onClick={() => {
                    handleLogout();
                    handleLinkClick();
                  }}
                >
                  <strong className="text-light">Logout</strong>
                </MDBNavbarLink>
              ) : (
                <MDBNavbarLink href="/login" onClick={handleLinkClick}>
                  <strong className="text-light">Login</strong>
                </MDBNavbarLink>
              )}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
