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
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
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
              <MDBDropdown>
                <MDBDropdownToggle
                  tag="a"
                  className="nav-link text-light"
                  role="button"
                >
                  <strong>Subjects</strong>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="text-dark">
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/circuits"
                      onClick={handleLinkClick}
                    >
                      Circuits
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/Electromagnetism"
                      onClick={handleLinkClick}
                    >
                      Electromagnetism
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/physics"
                      onClick={handleLinkClick}
                    >
                      Physics
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/control-System"
                      onClick={handleLinkClick}
                    >
                      Control System
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/Electronics Engineering"
                      onClick={handleLinkClick}
                    >
                      Electronics Engineering
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/Robotics"
                      onClick={handleLinkClick}
                    >
                      Robotics
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/mathematics"
                      onClick={handleLinkClick}
                    >
                      Mathematics
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/engineering-Drawing"
                      onClick={handleLinkClick}
                    >
                      Engineering Drawing
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/microprocessor"
                      onClick={handleLinkClick}
                    >
                      Microprocessor
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/power-electronics"
                      onClick={handleLinkClick}
                    >
                      power electronics
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem link>
                    <MDBNavbarLink
                      className="text-black"
                      href="/subjects/Electrical-machines"
                      onClick={handleLinkClick}
                    >
                      Electrical machines
                    </MDBNavbarLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
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
