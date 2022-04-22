import React from 'react';
import { NavLink } from "react-router-dom";

function NavBar({ handleLogoutClick }) {
  return (
    <nav className='btn-group d-flex'>
      <NavLink className="btn btn-primary" to="/" >Map View</NavLink>
      <NavLink className="btn btn-primary" to="/listview" >List View</NavLink>
      <NavLink className="btn btn-primary" to="/profile" >Profile</NavLink>
      <button className="btn btn-secondary col-2" onClick={handleLogoutClick}>Logout</button>
    </nav>
  );
}

export default NavBar;