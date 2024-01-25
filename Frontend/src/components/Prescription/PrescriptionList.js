// declare necessary imports
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Prescription.css';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('http://localhost:5000/prescription/getAllPrescriptions');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error.message);
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    console.log('prescriptions Array Length:', prescriptions.length);
  }, [prescriptions]);

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName && prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className='pagetitle-prescription'>Prescription List</h2>

      <label className='search-bar'>Filter by Patient Name:</label>
      <input
      className='search-input'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />

      {filteredPrescriptions && filteredPrescriptions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Prescription Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.patientId}</td>
                <td>{prescription.patientName}</td>
                <td>{new Date(prescription.date).toLocaleDateString()}</td>
                <td>{prescription.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescriptions available</p>
      )}
    </div>
  );
};

export default PrescriptionList;
