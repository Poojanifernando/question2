import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/AddRecord.css";

const AddRecords = ({ isOpen, onClose, patient }) => {
  const [records, setRecords] = useState('');

  const handleAddSpecialRecords = async (e) => {
    e.preventDefault();

    if (records.trim() === '') {
      alert('Please enter special records.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/specialRecord/save', {
        patientId: patient._id,
        patientName: patient.name,
        records: records,
      });

      if (response.status === 201) {
        alert('Special records added successfully.');
        onClose(); // Close the modal after adding records
      } else {
        alert("Error adding special records.");
      }
    } catch (error) {
      console.error('Error adding special records:', error.message);
      alert("An error occurred while adding special records.");
    }
  };

  return (
    <div className="" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="">
        <h2>Add Special Records for {patient.name}</h2>
        <form onSubmit={handleAddSpecialRecords}>
          <textarea
            value={records}
            onChange={(e) => setRecords(e.target.value)}
            placeholder="Enter special records..."
          />
          <button type="submit">Add Records</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecords;
