import React, { useState } from 'react';
import axios from 'axios';
import './Ambulence.css';
import Navbar from '../Navbar';
import LandNav from '../Landpage/LandNav';
import FooterPage from '../Landpage/FooterPage';


const Ambulence = () => {
  const [newCandidate, setNewCandidate] = useState({
    patientId: '',
    email: '',
    phoneNumber: '',
    facilities: '',
    disease: '',
    date: '',
    time: '',
    fromLocation: '',
    toLocation: '',
    fromAddress: {
      fromLine1: '',
      fromLine2: '',
      fromCity: '',
    },
    toAddress: {
      toLine1: '',
      toLine2: '',
      toCity: '',
    },
    fromHospitalName: '',
    toHospitalName: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'fromHospitalName') {
      setNewCandidate((prevData) => ({ ...prevData, fromHospitalName: value }));
    } else if (name === 'toHospitalName') {
      setNewCandidate((prevData) => ({ ...prevData, toHospitalName: value }));
    } else if (name === 'fromLocation' || name === 'toLocation') {
      setNewCandidate((prevData) => ({ ...prevData, [name]: value, fromHospitalName: '', toHospitalName: '' }));
    } else if (name.startsWith('fromAddress') || name.startsWith('toAddress')) {
      const [nestedName, nestedField] = name.split('.');

      setNewCandidate((prevData) => {
        const nestedAddress = { ...prevData[nestedName], [nestedField]: value };
        return { ...prevData, [nestedName]: nestedAddress };
      });
    } else {
      setNewCandidate((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting data:', newCandidate);
      const response = await axios.post('http://localhost:8092/insert', newCandidate);
      if (response.status === 201) {
        setSuccessMessage('Booking successful!');
        setErrorMessage('');
        setNewCandidate({
          patientId: '',
          email: '',
          phoneNumber: '',
          facilities: '',
          disease: '',
          date: '',
          time: '',
          fromLocation: '',
          toLocation: '',
          fromAddress: {
            fromLine1: '',
            fromLine2: '',
            fromCity: '',
          },
          toAddress: {
            toLine1: '',
            toLine2: '',
            toCity: '',
          },
          fromHospitalName: '',
          toHospitalName: '',
        });
      } else {
        setSuccessMessage('');
        setErrorMessage('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setSuccessMessage('');
      setErrorMessage('Booking failed. Please try again.');
    }
  };

  return (
    <>
    <LandNav/>
      <div className='abcdef'>
        <div className='marquee-1'>
          <h3 className='marquee-2'> Welcome to Online Doctor Appointment Portal!  ThankYou!  Visit Again </h3>
        </div>
        <div className='xyz'>
          <div className="Ambulence-container">
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="column-left">
                <strong><label>Patient ID:</label></strong>
                <input type="text" name="patientId" value={newCandidate.patientId} onChange={handleInputChange} required />

                <strong><label>Email:</label></strong>
                <input type="text" name="email" value={newCandidate.email} onChange={handleInputChange} required />

                <strong><label>Phone Number:</label></strong>
                <input type="text" name="phoneNumber" value={newCandidate.phoneNumber} onChange={handleInputChange} required />

                <strong><label>Facilities:</label></strong>
                <select name="facilities" value={newCandidate.facilities} onChange={handleInputChange} required>
                  <option value="">Select Facilities</option>
                  <option value="Oxygen">Oxygen</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Defibrillator">Defibrillator</option>
                  <option value="Suction Unit">Suction Unit</option>
                  <option value="Medical Kits">Medical Kits</option>
                  <option value="Other">Other</option>
                </select>

                <strong><label>Disease :</label></strong>
                <select name="disease" value={newCandidate.disease} onChange={handleInputChange} required>
                  <option value="">Select Disease</option>
                  <option value="Accident">Accident</option>
                  <option value="Heartstroke">Heartstroke</option>
                  <option value="Poisoned">Poisoned</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Death">Death</option>
                  <option value="Others">Others</option>
                </select>

                <strong><label>Date:</label></strong>
                <input type="date" name="date" value={newCandidate.date} onChange={handleInputChange} required />

                <strong><label>Time:</label></strong>
                <input type="time" name="time" value={newCandidate.time} onChange={handleInputChange} required />
              </div>

              <div className="column-right">
                <strong><label>From Location:</label></strong>
                <div>
                  <label>
                    <input type="radio" name="fromLocation" value="Resident" checked={newCandidate.fromLocation === 'Resident'} onChange={handleInputChange} />
                    Resident
                  </label>
                  <label>
                    <input type="radio" name="fromLocation" value="Hospital" checked={newCandidate.fromLocation === 'Hospital'} onChange={handleInputChange} />
                    Hospital
                  </label>
                </div>

                {newCandidate.fromLocation === 'Resident' && (
                  <div>
                    <strong><label>Line 1:</label></strong>
                    <input type="text" name="fromAddress.fromLine1" value={newCandidate.fromAddress.fromLine1} onChange={handleInputChange} required />

                    <strong><label>Line 2:</label></strong>
                    <input type="text" name="fromAddress.fromLine2" value={newCandidate.fromAddress.fromLine2} onChange={handleInputChange} required />

                    <strong><label>City:</label></strong>
                    <input type="text" name="fromAddress.fromCity" value={newCandidate.fromAddress.fromCity} onChange={handleInputChange} required />
                  </div>
                )}

                {newCandidate.fromLocation === 'Hospital' && (
                  <div>
                    <strong><label>Hospital Name:</label></strong>
                    <select name="fromHospitalName" value={newCandidate.fromHospitalName} onChange={handleInputChange} required>
                      <option value="">Select Hospital</option>
                      <option value="Apollo Hospital">Apollo Hospital</option>
                      <option value="MGM Hospital">MGM Hospital</option>
                      <option value="Continental Hospita">Continental Hospital</option>
                      <option value="Yashoda Hospital">Yashoda Hospital</option>
                      <option value="KIMS Hospitals">KIMS Hospitals</option>
                      <option value="Medicover Hospitals">Medicover Hospitals</option>
                      <option value="Sunshine Hospitals">Sunshine Hospitals</option>
                      <option value="MaxCure Hospitals">MaxCure Hospitals</option>
               
                    </select>
                  </div>
                )}
                <br /><br/>

                <strong><label>To Location:</label></strong>
                <div>
                  <label>
                    <input type="radio" name="toLocation" value="Resident" checked={newCandidate.toLocation === 'Resident'} onChange={handleInputChange} />
                    Resident
                  </label>
                  <label>
                    <input type="radio" name="toLocation" value="Hospital" checked={newCandidate.toLocation === 'Hospital'} onChange={handleInputChange} />
                    Hospital
                  </label>
                </div>

                {newCandidate.toLocation === 'Resident' && (
                  <div>
                    <strong><label>Line 1:</label></strong>
                    <input type="text" name="toAddress.toLine1" value={newCandidate.toAddress.toLine1} onChange={handleInputChange} required />

                    <strong><label>Line 2:</label></strong>
                    <input type="text" name="toAddress.toLine2" value={newCandidate.toAddress.toLine2} onChange={handleInputChange} required />

                    <strong><label>City:</label></strong>
                    <input type="text" name="toAddress.toCity" value={newCandidate.toAddress.toCity} onChange={handleInputChange} required />
                  </div>
                )}

                {newCandidate.toLocation === 'Hospital' && (
                  <div>
                    <strong><label>Hospital Name:</label></strong>
                    <select name="toHospitalName" value={newCandidate.toHospitalName} onChange={handleInputChange} required>
                      <option value="">Select Hospital</option>
                      <option value="Apollo Hospital">Apollo Hospital</option>
                      <option value="MGM Hospital">MGM Hospital</option>
                      <option value="Continental Hospita">Continental Hospital</option>
                      <option value="Yashoda Hospital">Yashoda Hospital</option>
                      <option value="KIMS Hospitals">KIMS Hospitals</option>
                      <option value="Medicover Hospitals">Medicover Hospitals</option>
                      <option value="Sunshine Hospitals">Sunshine Hospitals</option>
                      <option value="MaxCure Hospitals">MaxCure Hospitals</option>
               
                    </select>
                  </div>
                )}

                <br /><br/>
                <button type="submit" className="right-button">Submit</button>
              </div>
            </form>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </div>
        </div>
      </div>
    <FooterPage/> 
    </>
  );
};

export default Ambulence;
