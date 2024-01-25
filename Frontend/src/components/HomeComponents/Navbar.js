// navigation bar
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/patient-list">Patient Management</Link>
        </li>
        <li>
          <Link to="/list-prescription">Prescription Details</Link>
        </li>
        <li>
          <Link to="/list-payment">Bill Payments </Link>
        </li>

        <li>
          <Link to="/list-payment">Revenue Report</Link>
        </li>

        <li>
         <button className='logout-button'>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
