const express = require('express');
const router = express.Router();
const SpecialRecords = require('../models/specialRecord.model');

// Add  SpecialRecords
router.post('/save', async (req, res) => {
  const specialRecords = new SpecialRecords({
    patientId: req.body.patientId,
    patientName:req.body.patientName,
    records: req.body.records
   
  });

  try {
    const newrecords = await specialRecords.save();
    res.status(201).json(newrecords);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all prescriptions
router.get('/getAllrecords', async (req, res) => {
    try {
      const specialRecords = await SpecialRecords.find();
      res.json(specialRecords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get all records for a specific patient
router.get('/getAllrecords', async (req, res) => {
  try {
    const patientId = req.query.patientId; // Get patientId from the query parameters
    const specialRecords = await SpecialRecords.find({ patientId: patientId });
    res.json(specialRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  

module.exports = router;
