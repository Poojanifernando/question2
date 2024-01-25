// bill payment model

const mongoose = require('mongoose');

const billPaymentSchema = new mongoose.Schema({
  //to create relationships between patient model
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  patientName: { type: String, required: true },
  patientNIC:{ type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
});

const BillPayment = mongoose.model('BillPayment', billPaymentSchema);

module.exports = BillPayment;
