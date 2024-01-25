const express = require('express');
const router = express.Router();
const BillPayment = require('../models/billPayment.model');

// Add a new bill payment
router.post('/save', async (req, res) => {
  const billPayment = new BillPayment({
    patientId: req.body.patientId,
    patientName:req.body.patientName,
    patientNIC:req.body.patientNIC,
    date: req.body.date,
    amount: req.body.amount,
  });

  try {
    const newBillPayment = await billPayment.save();
    res.status(201).json(newBillPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all bill payments
router.get('/getAllBillPayments', async (req, res) => {
    try {
      const billPayments = await BillPayment.find();
      res.json(billPayments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
