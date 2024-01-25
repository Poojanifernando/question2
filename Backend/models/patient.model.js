//patient model

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthday: { type: Date, required: true },
  contactNo: { type: String, required: true },
  photo: { type: String }, 
  nic: { type: String, required: true },
  notes: { type: String },
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
