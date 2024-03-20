import React, { useState } from 'react';
import axios from 'axios';
import './Diagnostic.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import PatientNav from './Patient/PatientNav';
import FooterPage from './Landpage/FooterPage';

function PatientForm() {
    const [data,setData]=useState([])
    const navigate=useNavigate()
    const [selectedTests, setSelectedTests] = useState([]);
    const calculateTotalAmount = (selectedTests) => {
        let totalAmount = 0;
        selectedTests.forEach((test) => {
          const price = parseInt(test.label.split(' - ')[1].replace('$', ''), 10);
          totalAmount += price;
        });
        return totalAmount;
      };



var storedResponseString = localStorage.getItem('loggedIn');

var storedResponse = JSON.parse(storedResponseString);

var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;
var add=storedResponse.addressLine1;
var disease=storedResponse.chronicDisease;
var gender=storedResponse.gender;

  const [patientData, setPatientData] = useState({
    patientName: name,
    tests: '',
    chronicDisease: disease,
    typeofservices: '',
    bookingDate: '',
    bookingTime: '',
    addressLine1: add,
    address: '',
    referralDoctorName: '',
    diagnosticCenter: '',
    gender: gender,
    age: '',
    amount:'',
    collection: '',
    prescription: null,
    patientEmail: '',
    patientMobileNumber: phone
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPatientData({ ...patientData, prescription: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount(selectedTests);

    // Update the amount field in the patientData state
    setPatientData({ ...patientData, amount: totalAmount });

    try {
        const formData = new FormData();
        formData.append('patientName', name);
        formData.append('tests', patientData.tests);
        formData.append('chronicDisease', disease);
        formData.append('typeofservices', patientData.typeofservices);
        formData.append('bookingDate', patientData.bookingDate);
        formData.append('bookingTime', patientData.bookingTime);
        formData.append('addressLine1', add);
        formData.append('address', patientData.address);
        formData.append('referralDoctorName', patientData.referralDoctorName);
        formData.append('diagnosticCenter', patientData.diagnosticCenter);
        formData.append('gender', gender);
        formData.append('age', patientData.age);
        formData.append('amount', patientData.amount);
        formData.append('collection', patientData.collection);
        formData.append('prescription', patientData.prescription); // Add prescription file
        formData.append('patientEmail', patientData.patientEmail);
        formData.append('patientMobileNumber', phone);

      const response=  await axios.post('http://localhost:8080/api/patients/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setData(response.data);
        console.log(data)

        navigate("/test" ,{ state: { patientData: response.data } })
      // Clear form after successful submission
      setPatientData({
        patientName: '',
        tests: '',
        chronicDisease: '',
        typeofservices: '',
        bookingDate: '',
        bookingTime: '',
        addressLine1: '',
        address: '',
        referralDoctorName: '',
        diagnosticCenter: '',
        gender: '',
        age: '',
        amount:'',
        collection: '',
        prescription: null,
        patientEmail: '',
        patientMobileNumber: ''
      });

      // Add any success message/alert if needed
    } catch (error) {
      console.error('Error occurred while submitting patient data:', error);
      // Handle error messages/alerts
    }
};

const testOptions = [
    { value: 'bloodTest', label: 'Blood Test - $100' },
    { value: 'urineAnalysis', label: 'Urine Analysis - $80' },
    { value: 'cholesterolTest', label: 'Cholesterol Test - $120' },
    { value: 'ecg', label: 'ECG (Electrocardiogram) - $150' },
    { value: 'xray', label: 'X-Ray - $200' },
    { value: 'mri', label: 'MRI (Magnetic Resonance Imaging) - $500' },
    { value: 'ctScan', label: 'CT Scan (Computed Tomography) - $400' },
    { value: 'colonoscopy', label: 'Colonoscopy - $300' },
    { value: 'bloodPressureTest', label: 'Blood Pressure Test - $50' },
    { value: 'eyeExam', label: 'Eye Exam - $80' },
    { value: 'hivTest', label: 'HIV Test - $90' },
    { value: 'thyroidTest', label: 'Thyroid Test - $120' },
    { value: 'boneDensityTest', label: 'Bone Density Test - $150' },
    { value: 'allergyTest', label: 'Allergy Test - $100' },
    { value: 'diabetesTest', label: 'Diabetes Test - $70' }
  ];
  
  

  const handleChangeTests = (selectedOption) => {
    setSelectedTests(selectedOption);
  
    // Extract the labels of the selected tests
    const selectedTestLabels = selectedOption.map(option => option.label);
  
    // Join the labels into a comma-separated string
    const testsValue = selectedTestLabels.join(', ');
  
    // Update the tests field in the patientData state
    setPatientData({ ...patientData, tests: testsValue });
  };

  
  const handleCollectionChange = (selectedOption) => {
    setPatientData({ ...patientData, collection: selectedOption.value });
};

const collectionOptions = [
    { value: 'Walk-In', label: 'Walk-In' },
    { value: 'Home-Visit', label: 'Home-Visit' }
];
const handleLogin=()=>{
  navigate("/login")
}
  return (

    <>
    <PatientNav/>
    <div className="container mt-5">
      <h2>Diagnostics</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">Patient Name</label>
              <input type="text" className="form-control" id="patientName" name="patientName" placeholder="Enter patient name" value={name} onChange={handleChange} required />
            </div>
            {/* Add rest of the input fields */}
            <div className="mb-3">
              <label htmlFor="tests" className="form-label">Tests</label>
              <Select
                isMulti
                options={testOptions}
                value={selectedTests}
                onChange={handleChangeTests}
                placeholder="Select tests..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="chronicDisease" className="form-label">Chronic Disease</label>
              <input type="text" className="form-control" id="chronicDisease" name="chronicDisease" placeholder="Enter chronic disease" value={disease} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="serviceType" className="form-label">Type of Services</label>
              <select className="form-control" id="typeofservices" name="typeofservices" value={patientData.typeofservices} onChange={handleChange}>
                <option value="">Select Service Type</option>
                <option value="Radiology">Radiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Oncology">Oncology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Urology">Urology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Pediatrics">Pediatrics</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label">Booking Date</label>
              <input type="date" className="form-control" id="bookingDate" name="bookingDate" placeholder="Select booking date" value={patientData.bookingDate} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="bookingTime" className="form-label">Booking Time</label>
              <input type="time" className="form-control" id="bookingTime" name="bookingTime" placeholder="Select booking time" value={patientData.bookingTime} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <label htmlFor="collection" className="form-label">Collection</label>
            <Select
                options={collectionOptions}
                onChange={handleCollectionChange}
                placeholder="Select collection method"
                value={collectionOptions.find(option => option.value === patientData.collection)}
            />
        </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="addressLine1" className="form-label">City</label>
              <input type="text" className="form-control" id="addressLine1" name="addressLine1"  value={add} onChange={handleChange} />
            </div>
            
            <div className="mb-3">
              <label htmlFor="referralDoctorName" className="form-label">Referral Doctor Name</label>
              <input type="text" className="form-control" id="referralDoctorName" name="referralDoctorName" placeholder="Enter referral doctor name" value={patientData.referralDoctorName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="diagnosticCenter" className="form-label">Diagnostic Center</label>
              <input type="text" className="form-control" id="diagnosticCenter" name="diagnosticCenter" placeholder="Enter diagnostic center" value={patientData.diagnosticCenter} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" value={patientData.address} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select className="form-control" id="gender" name="gender" value={gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" id="age" name="age" placeholder="Enter age" value={patientData.age} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input type="text" className="form-control" id="amount" name="amount"  placeholder="Amount"   value={calculateTotalAmount(selectedTests)} disabled />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="prescription" className="form-label">Prescription</label>
          <input type="file" className="form-control" id="prescription" name="prescription" onChange={handleFileChange} accept=".pdf,.jpg,.png" required />
        </div>
        <div className="mb-3">
          <label htmlFor="patientEmail" className="form-label">Patient Email</label>
          <input type="email" className="form-control" id="patientEmail" name="patientEmail" placeholder="Enter patient email" value={patientData.patientEmail} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="patientMobileNumber" className="form-label">Patient Mobile Number</label>
          <input type="tel" className="form-control" id="patientMobileNumber" name="patientMobileNumber" placeholder="Enter patient mobile number" value={phone} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button onClick={handleLogin} className="btn btn-primary">Login</button>
      </form>
    </div>
    <FooterPage/>
    </>
  );
}

export default PatientForm;
