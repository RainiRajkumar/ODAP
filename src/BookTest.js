// 
import React from 'react';
import { useLocation} from 'react-router-dom';
import { useState } from 'react';
import jsPDF from 'jspdf';
import FullScreenPDFViewer from './FullViewPdf';
import { Button } from 'antd';
import axios from 'axios';
import PatientNav from './Patient/PatientNav';
import FooterPage from './Landpage/FooterPage';

const BooKTest = () => {
    const location = useLocation();
    const { patientData } = location.state || {};
    const [modeOfPayment, setModeOfPayment] = useState('cash');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleModeOfPaymentChange = (e) => {
        setModeOfPayment(e.target.value);
        // Reset card details when mode of payment changes
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
       
        setUpiId('');
        setUsername('')
        setPassword('')
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };
   
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


const handleUpiIdChange = (e) => {
    setUpiId(e.target.value);
};
const handleBookTest = async () => {

  
  try {
    // Convert prescription to PDF
    const pdfDoc = new jsPDF();
    pdfDoc.text(patientData.prescription, 10, 10);
    const pdfData = pdfDoc.output('arraybuffer');

    // Prepare form data
    const formData = new FormData();
    formData.append('patientName', patientData.patientName);
    formData.append('tests', patientData.tests);
    formData.append('chronicDisease', patientData.chronicDisease);
    formData.append('typeofservices', patientData.typeofservices);
    formData.append('bookingDate', patientData.bookingDate);
    formData.append('bookingTime', patientData.bookingTime);
    formData.append('addressLine1', patientData.addressLine1);
    formData.append('address', patientData.address);
    formData.append('referralDoctorName', patientData.referralDoctorName);
    formData.append('diagnosticCenter', patientData.diagnosticCenter);
    formData.append('gender', patientData.gender);
    formData.append('age', patientData.age);
    formData.append('amount', patientData.amount);
    formData.append('collection', patientData.collection);
    formData.append('prescription', new File([pdfData], 'prescription.pdf', { type: 'application/pdf' }));
    formData.append('patientEmail', patientData.patientEmail);
    formData.append('patientMobileNumber', patientData.patientMobileNumber);
    formData.append('modeOfPayment', modeOfPayment);

    // Make API call to store data in the database
    const response = await axios.post('http://localhost:8080/api/patients/payment', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    if (response.status === 201) {
        // Data stored successfully
        alert('Test booked successfully');
    } else {
        // Error occurred while storing data
        alert('Failed to book test');
    }
} catch (error) {
    // Handle API call errors
    console.error('Error:', error);
}
  const tokenGeneration = () => {
    return Math.floor(100000 + Math.random() * 900000)
  }
  const token = tokenGeneration();
  // Check if all fields are filled
  if (!patientData.patientName || !patientData.tests || !patientData.chronicDisease || !patientData.serviceType || !patientData.bookingDate || !patientData.bookingTime || !patientData.city || !patientData.address || !patientData.referralDoctorName || !patientData.diagnosticCenter || !patientData.gender || !patientData.age || !patientData.amount || !patientData.collection || !patientData.prescription || !patientData.patientEmail || !patientData.patientMobileNumber || !modeOfPayment) {

    return;
  }

  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  let yPos = 20;

  doc.setFontSize(20);
  doc.text('Booking Details', 105, yPos, null, null, 'center');
  yPos += 10;

  doc.setFontSize(15);
  doc.text('Date: ' + currentDate, 10, yPos);
  yPos += 10;
  doc.text('Time: ' + currentTime, 10, yPos);
  yPos += 30;

  const fields = [
    { label: 'Booking Id', value: token },
    { label: 'Patient Name', value: patientData.patientName },
    { label: 'Tests', value: patientData.tests },
    { label: 'Chronic Disease', value: patientData.chronicDisease },
    { label: 'Service Type', value: patientData.serviceType },
    { label: 'Booking Date', value: patientData.bookingDate },
    { label: 'Booking Time', value: patientData.bookingTime },
    { label: 'AddressLine1', value: patientData.city },
    { label: 'Address', value: patientData.address },
    { label: 'Referral Doctor Name', value: patientData.referralDoctorName },
    { label: 'Diagnostic Center', value: patientData.diagnosticCenter },
    { label: 'Gender', value: patientData.gender },
    { label: 'Age', value: patientData.age },
    { label: 'Amount', value: patientData.amount },
    { label: 'Collection', value: patientData.collection },

    { label: 'Patient Email', value: patientData.patientEmail },
    { label: 'Patient Mobile Number', value: patientData.patientMobileNumber },
    { label: 'Mode of Payment', value: modeOfPayment }
  ];

  for (const field of fields) {
    const lines = doc.splitTextToSize(field.label + ': ' + field.value, 190);
    doc.text(lines, 10, yPos);
    yPos += (lines.length * 10); // Increment yPos based on the number of lines printed
  }

  doc.save('test_booking_details.pdf');
};

const [showPDF, setShowPDF] = useState(false);
const togglePDF = () => {
  setShowPDF(!showPDF);
};


  return (
    <>
    <PatientNav/>
    <div className="container mt-5">
      <h2>Book Test</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="patientName" className="form-label">Patient Name</label>
          <input type="text" className="form-control" id="patientName" name="patientName" value={patientData.patientName} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="tests" className="form-label">Tests</label>
          <input type="text" className="form-control" id="tests" name="tests" value={patientData.tests} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="chronicDisease" className="form-label">Chronic Disease</label>
          <input type="text" className="form-control" id="chronicDisease" name="chronicDisease" value={patientData.chronicDisease} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="serviceType" className="form-label">Service Type</label>
          <input type="text" className="form-control" id="serviceType" name="serviceType" value={patientData.serviceType} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="bookingDate" className="form-label">Booking Date</label>
          <input type="text" className="form-control" id="bookingDate" name="bookingDate" value={patientData.bookingDate} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="bookingTime" className="form-label">Booking Time</label>
          <input type="text" className="form-control" id="bookingTime" name="bookingTime" value={patientData.bookingTime} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">AddressLine1</label>
          <input type="text" className="form-control" id="city" name="city" value={patientData.city} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Center Address</label>
          <input type="text" className="form-control" id="address" name="address" value={patientData.address} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="referralDoctorName" className="form-label">Referral Doctor Name</label>
          <input type="text" className="form-control" id="referralDoctorName" name="referralDoctorName" value={patientData.referralDoctorName} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="diagnosticCenter" className="form-label">Diagnostic Center</label>
          <input type="text" className="form-control" id="diagnosticCenter" name="diagnosticCenter" value={patientData.diagnosticCenter} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input type="text" className="form-control" id="gender" name="gender" value={patientData.gender} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="text" className="form-control" id="age" name="age" value={patientData.age} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="text" className="form-control" id="amount" name="amount" value={patientData.amount} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="collection" className="form-label">Collection</label>
          <input type="text" className="form-control" id="collection" name="collection" value={patientData.collection} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="prescription" className="form-label">Prescription</label>
          <Button onClick={togglePDF} className="pdf-button">
                      {showPDF ? 'Hide Prescription' : 'View Prescription'}
                    </Button>
                    {showPDF && <FullScreenPDFViewer pdfData={patientData.prescription} />}
        </div>

        <div className="mb-3">
          <label htmlFor="patientEmail" className="form-label">Patient Email</label>
          <input type="text" className="form-control" id="patientEmail" name="patientEmail" value={patientData.patientEmail} readOnly />
        </div>

        <div className="mb-3">
          <label htmlFor="patientMobileNumber" className="form-label">Patient Mobile Number</label>
          <input type="text" className="form-control" id="patientMobileNumber" name="patientMobileNumber" value={patientData.patientMobileNumber} readOnly />
        </div>
        <div className="mb-3">
                    <label htmlFor="modeOfPayment" className="form-label">Mode of Payment</label>
                    <select className="form-select" id="modeOfPayment" name="modeOfPayment" value={modeOfPayment} onChange={handleModeOfPaymentChange}>
                        <option value="cash">Cash</option>
                        <option value="creditcard">Credit Card</option>
                        <option value="debitcard">Debit Card</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="upi">UPI</option>
                    </select>
                </div>
                {modeOfPayment === 'creditcard' && (
    <div className="credit-card-form mb-3">
        <h4>Credit Card Details</h4>
        <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} pattern="[0-9]{13,16}" title="Please enter a valid card number." required />
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input type="text" className="form-control" id="expiryDate" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$" title="Please enter a valid expiry date in the format MM/YY." required />
            </div>
            <div className="col">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" name="cvv" value={cvv} onChange={handleCvvChange} pattern="[0-9]{3,4}" title="Please enter a valid CVV." required />
            </div>
        </div>
    </div>
)}

              
                {modeOfPayment === 'debitcard' && (
    <div className="credit-card-form mb-3">
        <h4>Debit Card Details</h4>
        <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} pattern="[0-9]{13,16}" title="Please enter a valid card number." required />
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input type="text" className="form-control" id="expiryDate" name="expiryDate" value={expiryDate} onChange={handleExpiryDateChange} pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$" title="Please enter a valid expiry date in the format MM/YY." required />
            </div>
            <div className="col">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input type="text" className="form-control" id="cvv" name="cvv" value={cvv} onChange={handleCvvChange} pattern="[0-9]{3,4}" title="Please enter a valid CVV." required />
            </div>
        </div>
    </div>
)}


       
                {modeOfPayment === 'netbanking' && (
    <div className="net-banking-form mb-3">
        <h4>Net Banking Details</h4>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} required />
        </div>
    </div>
)}

                {modeOfPayment === 'upi' && (
    <div className="upi-form mb-3">
        <h4>UPI ID</h4>
        <div className="mb-3">
            <label htmlFor="upiId" className="form-label">UPI ID</label>
            <input type="text" className="form-control" id="upiId" name="upiId" value={upiId} onChange={handleUpiIdChange} pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" title="Please enter a valid UPI ID." required />
        </div>
    </div>
)}

        <div className="mb-3">
                    <button style={{width:'auto'}} type="button" className="btn btn-primary" onClick={handleBookTest}>Book Test</button>
                </div>
      </form>
    </div>
    <FooterPage/>
    </>
  );
};

export default BooKTest;
