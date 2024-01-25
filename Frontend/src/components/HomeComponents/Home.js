import React from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css"

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Dr. John’s Clinic</h1>
        <p>Providing Quality Healthcare Services</p>
      </header>

      <section className="home-features">
        <div className="feature">
          <h2>Manage Patients</h2>
          <p>Efficiently manage patient information and records.</p>
          <Link to="/patients-list" className="btn">
            View Patients
          </Link>
        </div>

        <div className="feature">
          <h2>Prescriptions</h2>
          <p>Create and manage prescriptions for your patients.</p>
          <Link to="/prescriptions-list" className="btn">
            View Prescriptions
          </Link>
        </div>

        <div className="feature">
          <h2>Reports & Analytics</h2>
          <p>Generate reports and analyze clinic data.</p>
          <Link to="/revenue-list" className="btn">
            View Reports
          </Link>
        </div>

      
      </section>

    

      <footer className="home-footer">
        <p>&copy; 2024 Your Clinic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
