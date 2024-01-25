import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../../css/Payment.css';


function AddPayment() {
    const navigate = useNavigate();
    const location = useLocation();

    const [patientId, setPatientId] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientNIC, setpatientNIC] = useState('');
    const [date, setDate] = useState('');
    const [amount, setamount] = useState('');

    useEffect(() => {
        // Check if state contains patient details
        if (location.state && location.state.patient) {
            const { _id, name, nic } = location.state.patient;
            // Use patient details for initialization
            setPatientId(_id);
            setPatientName(name);
            setpatientNIC(nic);

        }
    }, [location.state]);

    //target.value use to get an input value from keyboard
    const handledate = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    };

    const handleamount = (e) => {
        e.preventDefault();
        setamount(e.target.value);
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (patientId === '' || patientName === '' || patientNIC === '' || date === '' || amount === '') {
            alert('Fill All The Details!!');
        } else {
            let newData = {
                patientId: patientId,
                patientName: patientName,
                patientNIC: patientNIC,
                date: date,
                amount: amount,
            };

            console.log('Sending payment Details...', newData);

            let data = await axios.post('http://localhost:5000/billPayment/save', {
                patientId: patientId,
                patientName: patientName,
                patientNIC: patientNIC,
                date: date,
                amount: amount,
            });

            console.log('Saved Data : ', data);

            if (data.status === !201) {
                alert("Data didn't Store");
            } else {
                alert('Data successfully added............');
                navigate('/list-payment');
            }
        }
    };

    return (
        <div className='form-container-payment'>
            <h1 className='pagetitle-payment'>Bill Payment </h1>
            {/* <Link to="/list-payment">
                <button> All Payments</button>
            </Link> */}
            <form>
                <label className='form-label-payment'>Patient ID:</label>
                <input type="text"
                    className='form-input-payment'
                    value={patientId} readOnly />

                <label className='form-label-payment'>Patient Name:</label>
                <input type="text"
                    className='form-input-payment'
                    value={patientName} readOnly />

                <label className='form-label-payment'>Patient NIC:</label>
                <input type="text"
                    className='form-input-payment'
                    value={patientNIC} readOnly />

                <label className='form-label-payment'>Date:</label>
                <input
                    className='form-input-payment'
                    type="date"
                    value={date}
                    name="date"
                    onChange={(e) => handledate(e)}
                />

                <br />
                <br />

                <label className='form-label-payment'>Amount Paid:</label>
                <input
                    className='form-input-payment'
                    type="number"
                    value={amount}
                    name="amount"
                    onChange={(e) => handleamount(e)}
                />

                <button type="button" className='form-button-payment' onClick={handlePayment}>
                    Add Prescription
                </button>
            </form>
        </div>
    );
}

export default AddPayment;
