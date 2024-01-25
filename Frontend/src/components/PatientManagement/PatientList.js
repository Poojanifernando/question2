import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../css/Patient.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [records, setrecords] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/patient/getallpatients');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPatients(data);
        // Initialize filteredPatients with all patients
        setFilteredPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error.message);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    console.log('Patients Array Length:', patients.length);
  }, [patients]);

  // to filter data
  const handleSearch = () => {
    const filteredData = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPatients(filteredData);
  };

  const handleAddPrescription = (patient) => {
    // Navigate to the "Add Prescription" page with the patient details
    navigate('/add-prescription', { state: { patient } });
  };



  const handlePatientRecords = async (patient) => {
    try {
      // Fetch previous records for the patient
      const response = await axios.get(`http://localhost:5000/specialRecord/getAllrecords?patientId=${patient._id}`);
      const previousRecords = response.data.map(record => record.records).join('\n');
      // Display a sweetalert with patient name, previous records, and textarea for adding new record
      const { value: records } = await Swal.fire({
        title: `Patient Records - ${patient.name}`,
        html: `
        <div style="margin-bottom: 10px;">
          <strong>Previous Records:</strong>
          <pre>${previousRecords}</pre>
        </div>
        <textarea id="recordTextArea" placeholder="Enter new record..." rows="4" style="width: 95%; margin-bottom: 10px;"></textarea>
      `,
        confirmButtonText: 'Add Record',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      });

      if (records) {
        // Make an HTTP POST request to save the special record
        const response = await axios.post('http://localhost:5000/specialRecord/save', {
          patientId: patient._id,
          patientName: patient.name,
          records: records,
        });
        if (response.status === 201) {
          // Handle success, e.g., show a success message
          Swal.fire('Record Added!', 'Special record has been added successfully.', 'success');
        } else {
          // Handle server error
          Swal.fire('Error', 'Failed to add special record.', 'error');
        }
      }
    } catch (error) {
      // Handle errors
      console.error('Error fetching or adding special record:', error.message);
      Swal.fire('Error', 'An error occurred while processing the request.', 'error');
    }
  };



  const handleAllPayments = (patient) => {
    navigate('/add-payment', { state: { patient } });
  };

  return (
    <div>
      <h2 className='pagetitle'>All Patients</h2>
      <br />

      <div>
        <label className='search-bar-patient '>Filter by Name or NIC:</label>
        <input
          className='search-input-patien'
          type="text"
          placeholder='name or NIC'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className='search-button'>
          Search
        </button>
      </div>
      <Link to="/add-patient">
        <button className='rounded-button'>Add New Patient</button>
      </Link>

      {filteredPatients && filteredPatients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>Contact No</th>
              <th>NIC</th>
              <th>Special Notes</th>
              <th>Prescription</th>
              <th>Patient Records</th>
              <th>Bill Payment</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{new Date(patient.birthday).toLocaleDateString()}</td>
                <td>{patient.contactNo}</td>
                <td>{patient.nic}</td>
                <td>{patient.notes}</td>
                <td>
                  <button onClick={() => handleAddPrescription(patient)} className='rounded-button'>
                    Prescription
                  </button>
                </td>
                <td>
                  <button onClick={() => handlePatientRecords(patient)} className='rounded-button'>
                    Patient Records
                  </button>


                </td>
                <td>
                  <button onClick={() => handleAllPayments(patient)} className='rounded-button'>
                    Payments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients available</p>
      )}
    </div>
  );
};

export default PatientList;
