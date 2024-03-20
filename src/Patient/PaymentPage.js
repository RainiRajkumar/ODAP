import React, { useState, useEffect } from 'react';
import './PaymentPage.css';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import PatientNav from './PatientNav';

const PaymentPage = () => {
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [formData, setFormData] = useState({
    fromType: '',
    fromHospitalName: '',
    fromResidenceLine1: '',
    fromResidenceLine2: '',
    fromResidenceCity: '',
    toHospitalName: '',
    facilities: '',
    email: '',
    mobileNumber: '',
    serviceFee: '', 
    date: '',
    time:'',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardHolderName: '',
    uniqueId: ''
  });
  const [searchedCandidate, setSearchedCandidate] = useState(null);
  const [searchedUniqueId, setSearchedUniqueId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchFormData().then(data => {
      console.log("Fetched data:", data);
      console.log("Service Fee:", data.serviceFee);
      setFormData(data);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    const serviceFee = parseFloat(formData.serviceFee);
    const GST = 0.12;
    const total = serviceFee + (serviceFee * GST);
    console.log("Service Fee:", serviceFee);
    console.log("Total Fee:", total);
    setFormData(prevData => ({
      ...prevData,
      totalFee: total
    }));
  }, [formData.serviceFee]); 

  const fetchFormData = async () => {
    const response = await fetch(`http://localhost:8910/getCandidateByUniqueId/${searchedUniqueId}`);
    const data = await response.json();
    console.log("Fetched candidate data:", data); // Log fetched candidate data
    return data;
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setPaymentStatus(option === 'Cash Payment' ? 'Pending' : 'Paid');
    setFormData(prevData => ({
      ...prevData,
      cardNumber: '',
      expiry: '',
      cvv: '',
      cardHolderName: ''
    }));
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePrintReceipt = () => {
    const doc = new jsPDF();
    doc.text(`Dear,`, 10, 10);
    doc.text(`You have successfully booked your Ambulance service with the facility of ${searchedCandidate.facilities},`, 10, 20);
    doc.text(`From: ${searchedCandidate.fromHospitalName}`, 10, 30);
    doc.text(`To: ${searchedCandidate.toHospitalName}`, 10, 40);
    doc.text(`Your ID is ${searchedCandidate.patientId}.`, 10, 50);
    doc.text(`You get all the details through your email: ${searchedCandidate.email}.`, 10, 60);
    doc.text(`and your Mobile Number: ${searchedCandidate.mobileNumber}.`, 10, 70);
    doc.text(`Total Fee: ${searchedCandidate.totalFee}`, 10, 80);
    doc.text(`Payment Status: ${paymentStatus}`, 10, 90); 
    doc.save("receipt.pdf");

    console.log('Form data:', formData);
    alert("Payment successful!");
    
    navigate('/');
    localStorage.clear();
  };

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    } else {
      return cleanedValue;
    }
  };

  const handleUniqueIdChange = async (e) => {
    const value = e.target.value;
    setSearchedUniqueId(value);
    try {
      const response = await fetch(`http://localhost:8910/getCandidateByUniqueId/${value}`);
      if (response.ok) {
        const data = await response.json();
        setSearchedCandidate(data);
      } else {
        alert("Candidate not found.");
      }
    } catch (error) {
      console.error('Error searching for candidate:', error);
      alert("Failed to search for candidate.");
    }
  };

  return (
    <>
    <PatientNav/>
    <div className="payment-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Unique ID"
          value={searchedUniqueId}
          onChange={handleUniqueIdChange}
        />
      </div>
      {searchedCandidate && (
        <div className="candidate-details">
          <h2>Candidate Details</h2>
          <p>Patient ID: {searchedCandidate.patientId}</p>
          <p>Email: {searchedCandidate.email}</p>
          <p>Mobile Number: {searchedCandidate.mobileNumber}</p>
          <p>From Address: {searchedCandidate.fromHospitalName}</p>
          <p>To Address: {searchedCandidate.toHospitalName}</p>
          <p>Facility : {searchedCandidate.facilities}</p>
          <p>Fee: {searchedCandidate.serviceFee}</p>
          <p>GST : 12%</p>
          <p>Total Fee: {searchedCandidate.totalFee}</p>
          <br/>
        </div>
      )}
      <div className="receipt">
        <h2>Service Receipt</h2>
        {searchedCandidate && (

        <p>Total Fee: {searchedCandidate.totalFee}</p>

        )}
        <h3>Select Payment Option:</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="Cash Payment"
              checked={selectedPaymentOption === 'Cash Payment'}
              onChange={() => handlePaymentOptionChange('Cash Payment')}
            />
            Cash Payment
          </label>
          <label>
            <input
              type="radio"
              name="paymentOption"
              value="Card Payment"
              checked={selectedPaymentOption === 'Card Payment'}
              onChange={() => handlePaymentOptionChange('Card Payment')}
            />
            Card Payment
          </label>
        </div>
        {selectedPaymentOption === 'Card Payment' && (
          <div>
            <h3>Card Payment</h3>
            <label>Card Number:</label>
            <input
              type="text"
              name="cardNumber"
              value={formatCardNumber(formData.cardNumber)}
              onChange={handleFormInputChange}
              placeholder="ex: 1234-5678-9876-5432"
              maxLength="19"
              required
            />
            <label>Expiry (MM/YY):</label>
            <input
              type="text"
              name="expiry"
              value={formatExpiryDate(formData.expiry)}
              onChange={handleFormInputChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleFormInputChange}
              maxLength="3" 
              required
            />
            <label>Card Holder Name:</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleFormInputChange}
              required
            />
          </div>
        )}
        <button onClick={handlePrintReceipt}>Proceed</button>
      </div>
    </div>

    </>
  );
};

export default PaymentPage;
