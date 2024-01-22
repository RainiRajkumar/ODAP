

import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandNav from '../Landpage/LandNav';
import FooterPage from '../Landpage/FooterPage';

function Diagnostic() {
  const [patientEmail, setPatientEmail] = useState('');
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosticCenter, setDiagnosticCenter] = useState('');
  const [dataBooking, setDataBooking] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState('');
  const [patientMobileNumber, setPatientMobileNumber] = useState('');
  const [testServiceDetails, setTestServiceDetails] = useState('');
  const [correctReport, setCorrectReport] = useState('');
  const [referralDoctorName, setReferralDoctorName] = useState('');
  const [pdf, setPdf] = useState('');

  const submit = async () => {
    const checkbox = document.getElementById('gridCheck');

    
    if (
      patientEmail === '' &&
      patientId === '' &&
      patientName === '' &&
      diagnosticCenter === '' &&
      dataBooking === '' &&
      bookingTime === '' &&
      address === '' &&
      patientMobileNumber === '' &&
      testServiceDetails === '' &&
      correctReport === '' &&
      referralDoctorName === '' &&
      pdf === ''
    ) {
      alert('Please fill in all the fields');
      return;
    }
    
    
    if (!/^[a-zA-Z ]+$/.test(patientName)) {
      alert('Please enter a valid patient name');
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(patientEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(patientMobileNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    const data = {
      patientEmail,
      patientId,
      patientName,
      diagnosticCenter,
      dataBooking,
      bookingTime,
      address,
      patientMobileNumber,
      testServiceDetails,
      correctReport,
      referralDoctorName,
      pdf,
    };

    try {
      const response = await axios.post('http://localhost:8092/api/Patient', data);
      console.log('Signup Success:', response.data);
      setPatientEmail('');
      setPatientName('');
      setDiagnosticCenter('');
      setPatientId('');
      setDataBooking('');
      setReferralDoctorName('');
      setPdf('');
      setAddress('');
      setBookingTime('');
      setPatientMobileNumber('');
      setTestServiceDetails('');
      setCorrectReport('');
      checkbox.checked = false;

      alert('Payment successful');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
<>
  <LandNav/>
    <div className="container-fluid bg-body-tertiary p-5" style={{ background: "url('https://thumbs.dreamstime.com/b/doctor-appointment-online-screen-medical-health-care-concept-158662057.jpg')" }}>
      <div className="row">
        <div className="col-12">
          <div className="container pt-4">
            <form className="row g-3">
              <div className="col-6">
                <label htmlFor="name" className="form-label text-primary fw-bold">PatientName</label>
                <input type="text" className="form-control" id="name" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Enter the Name" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPatientId4" className="form-label text-primary fw-bold">PatientId</label>
                <input type="text" className="form-control" id="inputPatientId4" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Enter the PatientId" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPatientEmail4" className="form-label text-primary fw-bold">PatientEmail</label>
                <input type="text" className="form-control" id="inputPatientEmail4" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="Enter the PatientMail" required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPatientMobileNumber" className="form-label text-primary fw-bold">PatientMobileNumber</label>
                <input type="text" className="form-control" id="inputPatientMobileNumber" value={patientMobileNumber} onChange={(e) => setPatientMobileNumber(e.target.value)} required />
              </div>
              <div className="col-6">
                <label htmlFor="inputReferralDoctorName" className="form-label text-primary fw-bold">ReferralDoctorName</label>
                <input type="text" className="form-control" id="inputReferralDoctorName" value={referralDoctorName} onChange={(e) => setReferralDoctorName(e.target.value)} placeholder="Enter the ReferralDoctorName" required />
              </div>
              <div className="col-6">
                <label htmlFor="inputDiagnosticCenter" className="form-label text-primary fw-bold">DiagnosticCenter</label>
                <select name="DiagnosticCenter" value={diagnosticCenter} onChange={(e) => setDiagnosticCenter(e.target.value)} required>
                  <option value="">Select diagnosticCenter</option>
                  <option value="Patient Ability">Patient Ability</option>
                  <option value="Patient Medic">Patient Medic</option>
                  <option value="Proven Positive">Proven Positive</option>
                  <option value="Path Concept">Path Concept</option>
                  <option value="Clinical Remedy">Clinical Remedy</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDataBooking" className="form-label text-primary fw-bold">DataBooking</label>
                <input type="date" className="form-control" id="inputDataBooking" value={dataBooking} onChange={(e) => setDataBooking(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputBookingTime" className="form-label text-primary fw-bold">BookingTime</label>
                <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
              <option value="Select Time">Select Time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">9:30 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="10:00 AM">10:30 AM</option>
              <option value="10:00 AM">11:00 AM</option>
              <option value="10:00 AM">11:30 AM</option>
              <option value="10:00 AM">12:00 PM</option>
              <option value="10:00 AM">12:30 PM</option>
              <option value="10:00 AM">1:00 PM</option>
              <option value="10:00 AM">2:00 PM</option>
              <option value="10:00 AM">2:30 PM</option>
              <option value="10:00 AM">3:00 PM</option>
              <option value="10:00 AM">3:30 PM</option>
              <option value="10:00 AM">4:00 PM</option>
              <option value="10:00 AM">4:30 PM</option>
              <option value="10:00 AM">5:00 PM</option>
            </select>
              </div>
              
              <div className="col-md-6">
                <label htmlFor="inputcorrectReport" className="form-label text-primary fw-bold">correctReport</label>
                <input type="text" className="form-control" id="inputCurroctReport" value={correctReport} onChange={(e) => setCorrectReport(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputAddress" className="form-label text-primary fw-bold">Address</label>
                <input type="text" className="form-control" id="inputCurroctReport" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputTestserviceDetails" className="form-label text-primary fw-bold">TestserviceDetails</label>
                <input type="text" className="form-control" id="inputTestserviceDetails" value={testServiceDetails} onChange={(e) => setTestServiceDetails(e.target.value)} required />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label text-primary fw-bold" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="col-12">
                <button type="button" className="btn btn-primary" onClick={submit}>
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <FooterPage/>
  </>
  );
}

export default Diagnostic;