// special Record model

const mongoose = require('mongoose');

const specialRecordsSchema = new mongoose.Schema({
  //to create relationships between patient model
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: { type: String, required: true },
  records: { type: String, required: true },
});

const SpecialRecords = mongoose.model('SpecialRecords', specialRecordsSchema);

module.exports = SpecialRecords;
