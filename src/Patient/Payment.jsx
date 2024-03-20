
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterPage from '../Landpage/FooterPage';
import PatientNav from './PatientNav';
import pic from "../img/paymentimage.jpg";



const Payment = () => {

  const location = useLocation();

  const { patientData } = location.state || {};

  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const [patientName, setPatientName] = useState(patientData.patientName);
  const [patientEmail, setPatientEmail] = useState(patientData.patientEmail);
  const [patientMobileNumber, setPatientMobileNumber] = useState(patientData.patientMobileNumber);
  const [typeOfService, setTypeOfService] = useState(patientData.typeOfService);
  const [doctorName, setDoctorName] = useState(patientData.doctorName);
  const [hospitalName, setHospitalName] = useState(patientData.hospitalName);
  const [address, setAddress] = useState(patientData.address);
  const [speciality, setSpeciality] = useState(patientData.speciality);
  const [fee, setFee] = useState(patientData.fee);
  const [totalFee, setTotalFee] = useState(patientData.totalFee);
  const [bookingDate, setBookingDate] = useState(patientData.bookingDate);
  const [bookingTime, setBookingTime] = useState(patientData.bookingDate);
  const [modeOfPayment, setModeOfPayment] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [upiID, setUPIID] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');





  const navigatehome = useNavigate();





  const handlePayment = async () => {

    const formData =
    {
      patientName,
      patientEmail,
      patientMobileNumber,
      doctorName,
      hospitalName,
      address,
      speciality,
      typeOfService,
      fee,
      totalFee,
      bookingDate,
      bookingTime,
      
    };




    try {
      const response = await axios.post('http://localhost:9081/payment', formData);
      setPatientEmail('');
      setPatientName('');
      setPatientMobileNumber('');
      setAddress('');
      setFee('');
      setTotalFee('');
      setTypeOfService('');
      setSpeciality('');
      setBookingDate('');
      setBookingTime('');
      setDoctorName('');
      setHospitalName('');
      setModeOfPayment('');
      setCardNumber('');
      setCVV('');
      setExpiry('');
      setUPIID('');



      console.log(response);

      console.log(response.status);

     

    

     


    }
    catch (error) {
      console.log(error);
    }


    const pdf = new jsPDF();

    pdf.addImage(pic, 'JPG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    pdf.text('Acknowledgement', 80, 20);
    //pdf.text(`Transaction ID : ${id}`,20,30);
    pdf.text(`Name of Patient: ${patientData.patientName}`, 20, 40);
    pdf.text('Appointmet Details: ', 20, 50);
    pdf.text(`Name of Doctor: ${patientData.doctorName}`, 20, 60);
    pdf.text(`Date : ${patientData.bookingDate}`, 20, 70);
    pdf.text(`Time : ${patientData.bookingTime}`, 80, 70);
    pdf.text(`Address : ${patientData.address}`, 20, 80);
    pdf.text('Payment Details: ', 20, 90);
    pdf.text('Status : Success ', 20, 100);
    pdf.text(`Amount : ${patientData.totalFee}`, 20, 110);
    pdf.text('Mode of Payment :' + selectedPaymentOption, 80, 100);
    // pdf.text('Payment Status: ',{paymentStatus}, 20, 120); 
    pdf.save('Appointment.pdf');



    alert("Payment successful!");
    navigatehome('/');
    localStorage.clear();
      


    


  };

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formattedValue;
  };

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
    setPaymentStatus(option === 'Cash Payment' ? 'Pending' : 'Paid');
    setCardNumber(
      prevData => ({
        ...prevData,
        cardNumber: '',
      }));
    setCVV(prevData => ({
      ...prevData,
      expiry: '',
    }));
    setExpiry(prevData => ({
      ...prevData,
      cvv: '',
    }));

  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;

    setCardNumber(prevData => ({
      ...prevData,
      [name]: value

    }));

    setCVV(prevData =>
    ({
      ...prevData,
      [name]: value
    }));

    setExpiry(prevData => ({
      ...prevData,
      [name]: value
    }));

  };
  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue.length > 2) {
      return cleanedValue.slice(0, 2) + '/' + cleanedValue.slice(2);
    } else {
      return cleanedValue;
    }
  };


  return (
    <>
      <PatientNav />

      <br />

      <div className='container-fluid'>


        <form className="form-container">
          <h2 style={{ textAlign: "center" }}>Patient Details:-</h2>


          <div className="form-group">
            <label >Patient Name:</label>
            <input type='text' id='patientName' value={patientData.patientName} />
          </div>
          <div className="form-group">
            <label >Patient Email:</label>
            <input type='text' value={patientData.patientEmail} />
          </div>
          <div className="form-group">
            <label >Patient Mobile Number:</label>
            <input type='text' value={patientData.patientMobileNumber} />
          </div>
          <h2 style={{ textAlign: 'center' }}>Appointment Details:-</h2>
          <div className="form-group">
            <label>Doctor Name:</label>
            <input type='text' value={patientData.doctorName} />
          </div>
          <div className="form-group">
            <label >Hospital Name:</label>
            <input type='text' value={patientData.hospitalName} />
          </div>
          <div className="form-group">
            <label htmlFor="Specialization">Specialization:</label>
            <input type='text' value={patientData.speciality} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingDate">Booking Date:</label>
            <input type='text' value={patientData.bookingDate} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Booking Time:</label>
            <input type='text' value={patientData.bookingTime} />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime">Service Type:</label>
            <input type='text' value={patientData.typeOfService} />
          </div>

          <h2 style={{ textAlign: 'center' }}>Payment Details:-</h2>
          <div className="form-group">
            <label htmlFor="fee">Fees :</label>
            <input type='text' value={patientData.fee} />
          </div>
          <div className="form-group">
            <label htmlFor="totalFee">Total Fees:</label>
            <input type='text' value={patientData.totalFee} />
          </div>

        </form>


        <form className='form-container'>
          <div>
            <h2 style={{ paddingLeft: "50px" }}>Payment Mode</h2>

            {/* <p style={{paddingLeft:"50px"}}>Total Fee: {patientData.totalFee}</p> */}


            <h5 style={{ paddingLeft: "50px" }}>Select Payment Option:</h5>

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
              <label>
                <input
                  type="radio"
                  name="paymentOption"
                  value="UPI Payment"
                  checked={selectedPaymentOption === 'UPI'}
                  onChange={() => handlePaymentOptionChange('UPI Payment')}
                />
                UPI Payment
              </label>
            </div>
            {selectedPaymentOption === 'Card Payment' && (
              <div>
                <h3>Card Payment</h3>
                <label>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="ex: 1234-5678-9876-5432"
                  maxLength="19"
                  required
                />
                <label>Expiry (MM/YY):</label>
                <input
                  type="text"
                  name="expiry"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
                <label>CVV:</label>
                <input
                  type="text"
                  name="cvv"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  maxLength="3"
                  required
                />

              </div>
            )}

            <button style={{ alignItems: "center" }} onClick={handlePayment}>Proceed</button>
            {/* <button onClick={PaymentReciept}>PDF</button> */}
          </div>
        </form>
      </div>

      <FooterPage />
    </>
  );
};

export default Payment;
