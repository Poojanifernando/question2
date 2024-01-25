const express = require('express');
const router = express.Router();
const Patient = require('../models/patient.model');

// Get all patients
router.get('/getallpatients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific patient by ID
router.get('/:id', getPatient, (req, res) => {
  res.json(res.patient);
});

// Add a new patient
router.post('/save', async (req, res) => {
  // Extracting patient details from request body
  const patient = new Patient({
    name: req.body.name,
    birthday: req.body.birthday,
    contactNo: req.body.contactNo,
    photo: req.body.photo,
    nic: req.body.nic,
    notes: req.body.notes,
  });

  try {
    // Save the new patient to the database
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a patient's details by ID
router.patch('/:id', getPatient, async (req, res) => {
  // Update patient details based on request body
  if (req.body.name) res.patient.name = req.body.name;
  if (req.body.birthday) res.patient.birthday = req.body.birthday;
  if (req.body.contactNo) res.patient.contactNo = req.body.contactNo;
  if (req.body.photo) res.patient.photo = req.body.photo;
  if (req.body.nic) res.patient.nic = req.body.nic;
  if (req.body.notes) res.patient.notes = req.body.notes;

  try {
    // Save the updated patient to the database
    const updatedPatient = await res.patient.save();
    res.json(updatedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a patient by ID
router.delete('/:id', getPatient, async (req, res) => {
  try {
    // Remove the patient from the database
    await res.patient.remove();
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a patient by ID
async function getPatient(req, res, next) {
  let patient;
  try {
    // Find patient by ID in the database
    patient = await Patient.findById(req.params.id);
    if (patient == null) {
      return res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  // Attach the found patient to the response object
  res.patient = patient;
  next();
}

module.exports = router;
