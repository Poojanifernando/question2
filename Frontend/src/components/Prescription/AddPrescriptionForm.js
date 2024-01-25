import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import "../../css/Prescription.css"


function AddPrescription() {
  const navigate = useNavigate();
  const location = useLocation();

  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    // Check if state contains patient details
    if (location.state && location.state.patient) {
      const { _id, name } = location.state.patient;
      // Use patient details for initialization
      setPatientId(_id);
      setPatientName(name);

    }
  }, [location.state]);

  //target.value use to get an input value from keyboard
  const handledate = (e) => {
    e.preventDefault();
    setDate(e.target.value);
  };

  const handledetails = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();

    if (patientId === '' || patientName === '' || date === '' || details === '') {
      alert('Fill All The Details!!');
    } else {
      let newData = {
        patientId: patientId,
        patientName: patientName,
        date: date,
        details: details,
      };

      console.log('Sending prescription Details...', newData);

      let data = await axios.post('http://localhost:5000/prescription/save', {
        patientId: patientId,
        patientName: patientName,
        date: date,
        details: details,
      });

      console.log('Saved Data : ', data);

      if (data.status === !201) {
        alert("Data didn't Store");
      } else {
        alert('Data successfully added............');
        navigate('/list-prescription');
      }
    }
  };

  return (
    //   <div>
    //   <Link to="/list-prescription">
    //   <button>Prescription List</button>

    // </Link>
    // </div>
    <div className='form-container-prescription'>
      <h1 className='pagetitle-prescription'>New Prescription</h1>

      <form>
        <label className='form-label-prescription'>Patient ID:</label>
        <input type="text"
          className='form-input-prescription'
          value={patientId} readOnly />

        <label className='form-label-prescription'>Patient Name:</label>
        <input type="text"
          className='form-input-prescription'
          value={patientName} readOnly />

        <label className='form-label-prescription'>Date:</label>
        <input
          type="date"
          className='form-input-prescription'
          value={date}
          name="date"
          onChange={(e) => handledate(e)}
        />

        <br />
        <br />

        <label className='form-label-prescription'>Details:</label>
        <textarea
          value={details}
          className='form-input-prescription'
          name="details"
          onChange={(e) => handledetails(e)}
        />

        <button type="button" className='form-button-prescription' onClick={handleAddPrescription}>
          Add Prescription
        </button>
      </form>
    </div>
  );
}

export default AddPrescription;
