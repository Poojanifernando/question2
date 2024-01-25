const express = require('express');
const router = express.Router();
const Prescription = require('../models/prescription.model');

// Add a new prescription
router.post('/save', async (req, res) => {
  const prescription = new Prescription({
    patientId: req.body.patientId,
    patientName:req.body.patientName,
    date: req.body.date,
    details: req.body.details,
  });

  try {
    const newPrescription = await prescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all prescriptions
router.get('/getAllPrescriptions', async (req, res) => {
    try {
      const prescriptions = await Prescription.find();
      res.json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  
// Get prescriptions for a specific patient
router.get('/ByPatient/:patientId', async (req, res) => {
    try {
      const prescriptions = await Prescription.find({ patientId: req.params.patientId });
      res.json(prescriptions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
