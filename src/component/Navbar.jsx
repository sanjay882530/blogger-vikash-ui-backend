import React, { useState, useContext, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  const { user, setUser } = useContext(UserContext);

  // Check if the user is stored in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser); // Update the user context
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    setUser(null); // Update user context
    window.location.href = '/'; // Redirect to home after logout
  };

  return (
    <MDBNavbar className="" expand='lg' bgColor='dark'>
      <MDBContainer fluid>
        <Link className="navimage" to='/'>
          <img src='/sanjay.png' alt="Logo" width={200} height={25} />
        </Link>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNav(!openNav)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={openNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/'>
                <strong style={{ color: '#e6ffff' }}>Home</strong>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/viewBlogs'>
                <strong style={{ color: '#e6ffff' }}>Blog</strong>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              {user ? (
                <MDBNavbarLink onClick={handleLogout}>
                  <strong style={{ color: '#e6ffff' }}>Logout</strong>
                </MDBNavbarLink>
              ) : (
                <MDBNavbarLink href='/login'>
                  <strong style={{ color: '#e6ffff' }}>Login</strong>
                </MDBNavbarLink>
              )}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
