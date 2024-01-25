import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar  from "./components/HomeComponents/Navbar";

// Import all the components
import PatientList from "./components/PatientManagement/PatientList";
import AddPatient  from "./components/PatientManagement/AddPatient";
import AddPrescription  from "./components/Prescription/AddPrescriptionForm";
import PrescriptionList from "./components/Prescription/PrescriptionList";
import AddPayment from "./components/BillPaymentAndReports/AddPayment";
import PaymentList from "./components/BillPaymentAndReports/PaymentList";
import Home from "./components/HomeComponents/Home";



export default function AppRouter() {
  return (
    <div>
      <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Home page */}
          
          <Route exact path="/" element={<Home />} />
{/* 
          components pages */}
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/add-patient" element={<AddPatient  />} /> 
          <Route path="/add-prescription" element={<AddPrescription  />} />
          <Route path="/list-prescription" element={<PrescriptionList  />} />  
          <Route path="/add-payment" element={<AddPayment  />} /> 
          <Route path="/list-payment" element={<PaymentList  />} />  
          
        </Routes>
        </div>
      </Router>
    </div>
  );
}
