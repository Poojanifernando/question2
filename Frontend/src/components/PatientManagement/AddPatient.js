import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../css/Patient.css";

function AddPatient() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [photo, setPhoto] = useState('');
  const [nic, setNic] = useState('');
  const [notes, setNotes] = useState('');

  //target.value use to get an input value from keyboard
  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);

  }
  const handleBirthday = (e) => {
    e.preventDefault();
    setBirthday(e.target.value);

  }

  const handleContactno = (e) => {
    e.preventDefault();
    setContactNo(e.target.value);

  }

  const handlePhoto = (e) => {
    e.preventDefault();
    setPhoto(e.target.value);

  }

  const handleNIC = (e) => {
    e.preventDefault();
    setNic(e.target.value);

  }

  const handleNotes = (e) => {
    e.preventDefault();
    setNotes(e.target.value);

  }



  const handleAddPatient = async (e) => {
    e.preventDefault();

    if (name === '' || birthday === '' || contactNo === '' || photo === '' || nic === '' || notes === '') {
      alert("Fill All The Details!!")

    } else {

      let newData = {
        name: name,
        birthday: birthday,
        contactNo: contactNo,
        photo: photo,
        nic: nic,
        notes: notes
      }

      console.log("Sending patient Details...", newData);


      let data = await axios.post('http://localhost:5000/patient/save', {
        name: name,
        birthday: birthday,
        contactNo: contactNo,
        photo: photo,
        nic: nic,
        notes: notes
      });

      console.log("Saved Data : ", data);

      if (data.status === !201) {
        alert("Data didn't Store")
      }
      else {

        alert("Data succefully added............")
        navigate('/patient-list')
      }

    }


  }

  return (
    <div className="form-container">
      <h1 className='pagetitle'>New Patient</h1>
      <form>
        <label className="form-label">Name:</label>
        <input type="text"
          className="form-input"
          placeholder='name'
          name="name"
          value={name}
          onChange={(e) => handleName(e)}
        />

        <label className="form-label">Birthday:</label>
        <input type="date"
          className="form-input"
          name="birthday"
          value={birthday}
          onChange={(e) => handleBirthday(e)}
        />

        <label className="form-label">Contact No:</label>
        <input type="text"
          className="form-input"
          placeholder='eg : 0761111111'
          name="contactNo"
          value={contactNo}
          onChange={(e) => handleContactno(e)}
        />

        <label className="form-label">Patient photo:</label>
        <input type="file"
          className="form-input"
          name="photo"
          value={photo}
          onChange={(e) => handlePhoto(e)}
        />

        <label className="form-label">NIC:</label>
        <input type="text"
          placeholder='1234567890/12345678v'
          className="form-input"
          name="nic"
          value={nic}
          onChange={(e) => handleNIC(e)}
        />

        <label className="form-label"> Special Notes:</label>
        <textarea value={notes}
          className="form-input"
          placeholder='special notes about the patient(eg : Regular/special)'
          name="notes"
          onChange={(e) => handleNotes(e)}
        />

        <button type="button" className="form-button" onClick={handleAddPatient}>
          Add Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;
