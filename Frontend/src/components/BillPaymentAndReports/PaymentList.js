import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:5000/billPayment/getAllBillPayments');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error.message);
      }
    };

    fetchPayments();
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredPayments = selectedMonth
    ? payments.filter((payment) => new Date(payment.date).getMonth() === parseInt(selectedMonth, 10))
    : payments;

  const totalAmountForMonth = filteredPayments.reduce((total, payment) => total + payment.amount, 0);

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, `Payments_${new Date().toISOString()}.xlsx`);
  };

  useEffect(() => {
    console.log('payments Array Length:', payments.length);
  }, [payments]);

  return (
    <div>
      <h2 className='pagetitle-payment'>All Payments</h2>

      <label htmlFor="monthSelect" className='filter-bar'>Select Month: </label>
      <select className='filter-button' id="monthSelect" onChange={handleMonthChange} value={selectedMonth}>

        <option value="">All Months</option>
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={index.toString()}>
            {new Date(2000, index, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      {filteredPayments && filteredPayments.length > 0 ? (
        <>

          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Patient NIC</th>
                <th>Payments Date</th>
                <th>Paid Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.patientName}</td>
                  <td>{payment.patientNIC}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className='filter-bar'>Total Amount for {new Date(2000, parseInt(selectedMonth, 10), 1).toLocaleString('default', { month: 'long' })}: Rs. {totalAmountForMonth} .00 </p>

          <p> You can download the selected months's payment details as an Excel report</p>
          <button className = 'form-button-payment' onClick={downloadExcel}>Download Excel</button>
        </>


      ) : (
        <p>No payments available</p>
      )}
    </div>
  );
};

export default PaymentList;
