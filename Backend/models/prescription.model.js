// prescription model

const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  //to create relationships between patient model
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: { type: String, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
