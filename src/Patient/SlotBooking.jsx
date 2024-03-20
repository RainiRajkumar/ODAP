

import React, { useEffect, useState } from "react";
import "./SlotBooking.css";
import FooterPage from "../Landpage/FooterPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientNav from "./PatientNav";
import { setAppointDetails, setSlotDetails } from "./Authstate";

function TimeSlots() {


  var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);
// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [slotDates, setSlotDates] = useState([]);

  const [allTimeSlots] = useState([
    "10:00 AM", "10:20 AM", "10:40 AM",
    "11:00 AM", "11:20 AM", "11:40 AM",
    "12:00 PM", "12:20 PM", "12:40 PM",
    "2:00 PM", "2:20 PM", "2:40 PM",
    "3:00 PM", "3:20 PM", "3:40 PM",
    "4:00 PM", "4:20 PM", "4:40 PM",
    "5:00 PM", "5:20 PM"
  ]);
  const [doctorNames, setDoctorNames] = useState([]);
  const [hospitalNames, setHospitalNames] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [address, setAddress] = useState([]);
  const [experience,setExperiences]=useState([]);
  const [patientEmail,setPatientEmail]=useState('');
  const [patientDescription,setPatientDescription]=useState('');
  const [RegistrationNumber,setRegistrationNumbers]=useState([]);
  const [RegistrationYear,setRegistrationYears]=useState([]);
  const [Mail,setMails]=useState([]);
  const [PhoneNumber,setPhoneNumbers]=useState([]);
  const [RegistrationCouncil,setRegistrationCouncils]=useState([]);


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate('');
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);

  const [typeOfService, setTypeOfService] = useState('');
  const [fee,setFee]=useState(0);
  const [totalFee, setTotalFee] = useState(0);

  const [data,setData]=useState('');


  const handleServiceChange = (e) => {
    setTypeOfService(e.target.value);
    // Calculate fee based on selected service
    switch (e.target.value) {
    
      case 'Online Consulting':
        setFee(1000);
        setTotalFee(1000*0.18+1000); // Fee for service 1
        break;
      case 'In-Patient/Walk-In':
        setFee(800);
        setTotalFee(800*0.18+800); // Fee for service 2
        break;
     
      default:
        setFee(0); // Default fee
    }
  };

  useEffect(() => {
    async function fetchSpecialities() {
      try {
        const response = await axios.get("http://localhost:9099/api/getAll");
        const data = response.data;

        if (Array.isArray(data)) {
          const specialityList = [...new Set(data.map((item) => item.speciality))];
          setspeciality(specialityList);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching specialities:", error);
      }
    }

    fetchSpecialities();
  }, []);

  const fetchSlotDates = async () => {
    try {
      // Make an HTTP GET request to fetch slot dates
      const response = await axios.get(' http://localhost:9099/api/weeklySlotDates/1'); // Replace '/weeklySlotDates/1' with your endpoint
      const data = response.data;

      // Update the state with the fetched slot dates
      setSlotDates(data.slotDates);
    } catch (error) {
      console.error('Error fetching slot dates:', error);
    }
  };

  const handleDateSelect = (date) => {
    // Update the selected date state
    setSelectedDate(date);
  };

  // Fetch slot dates when the component mounts
  useEffect(() => {
    fetchSlotDates();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSpecialityChange = async (selectedValue) => {
    try {
      const response = await axios.get(`http://localhost:9099/api/getSpecility/${selectedValue}`);
      const data = response.data;

      if (Array.isArray(data)) {
        const doctorNames = data.map(doctor => ({ name: doctor.doctorName }));
        const hospitals = data.map(doctor => ({ name: doctor.hospitalName, id: doctor.hospitalId }));
        const addresses = data.map(doctor => ({ name: doctor.address2, id: doctor.address2 }));

        const experiences=data.map(doctor => ({name:doctor.experience,id:doctor.experience}));
        const RegistrationNumbers=data.map(doctor => ({name:doctor.Registrationnumber,id:doctor.Registrationnumber}));
        const RegistrationYears=data.map(doctor => ({name:doctor.Registrationyear,id:doctor.Registrationyear}));
        const RegistrationCouncils=data.map(doctor => ({name:doctor.Registrationcouncil,id:doctor.Registrationcouncil}));
        const PhoneNumbers=data.map(doctor => ({name:doctor.Phonenumber,id:doctor.Phonenumber}));
        const Mails=data.map(doctor => ({name:doctor.Email,id:doctor.Email}));

        setDoctorNames(doctorNames);
        setHospitalNames(hospitals);
        setAddress(addresses);
        setExperiences(experiences);
        setRegistrationNumbers(RegistrationNumbers);
        setRegistrationCouncils(RegistrationCouncils);
        setRegistrationYears(RegistrationYears);
        setPhoneNumbers(PhoneNumbers);
        setMails(Mails);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchBookedSlotsdata() {
      try {
        const response = await axios.get("http://localhost:9081/api/v1/all");

        const allSlots = response.data;

        const bookingTimes = allSlots.map((slot) => ({
          time: slot.bookingTime,
          date: slot.bookingDate,
        }));

        setUnavailableSlots((prevUnavailableSlots) => [
          ...prevUnavailableSlots,
          ...bookingTimes
            .filter((slot) => slot.date === selectedDate)
            .map((slot) => slot.time),
        ]);

        setUnavailableSlotsDate((prevUnavailableSlots) => [
          ...prevUnavailableSlots,
          ...bookingTimes.map((slot) => slot.date),
        ]);

        setBookedSlots((prevBookedSlots) => [
          ...prevBookedSlots,
          ...bookingTimes,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (selectedDate) {
      fetchBookedSlotsdata();
    }
  }, [selectedDate]);

  const handleSlotClick = (clickedTime) => {
    if (
      !formSubmitted &&
      !unavailableSlots.includes(clickedTime) &&
      !bookedSlots.some(
        (slot) => slot.time === clickedTime && slot.date === selectedDate
      )
    ) {
      setSelectedTimeSlot(clickedTime);
    }
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    const selectedDate = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDate >= currentDate) {
      setSelectedDate(selectedDate);
    }
    if(selectedDate>=currentDate+7)
    {
      setSelectedDate(selectedDate);
      alert("please select date between current date to 7 days");
    }
     else {
      alert("Please select a future date");
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    else if (patientEmail === ''){
      alert("email id is required field ");
      document.getElementById('patientEmail').style.borderColor = 'red';
  }
  else if(doctorNames === '')
  {
    alert("doctorName is required field");
    document.getElementById('doctorName').style.borderColor = 'red';

  }
  else if(speciality === '')
  {
    alert("Speciality is required field");
    document.getElementById('speciality').style.borderColor = 'red';

  }
  else if(hospitalNames === '')
  {
    alert("Hospital Name is required field");
    document.getElementById('hospitalName').style.borderColor = 'red';

  }
  else if(address === '')
  {
    alert("Address is required field");
    document.getElementById('address').style.borderColor = 'red';

  }
  else if(typeOfService === '')
  {
    alert("Type of Service is required field");
    document.getElementById('typeOfService').style.borderColor = 'red';

  }
  else if(patientDescription === '')
  {
    alert("patient Description is required field");
    document.getElementById('patientDescription').style.borderColor = 'red';

  }



    const pojoData = {
      doctorName: e.target.doctorName.value,
      hospitalName: e.target.hospitalName.value,
      bookingDate: selectedDate,
      bookingTime: selectedTimeSlot,
      patientName:e.target.patientName.value,
      patientId:e.target.patientId.value,
      patientEmail: e.target.patientEmail.value,
      patientMobileNumber: e.target.patientMobileNumber.value,
      typeOfService: e.target.typeOfService.value,
      patientDescription: e.target.patientDescription.value,
      address:e.target.address.value,
      // experience:e.target.experience.value,
      speciality:e.target.speciality.value,
      totalFee:e.target.totalFee.value,
      fee:e.target.fee.value,
    };


    try {
      const response12 = await axios.post('http://localhost:9081/api/v1/save', pojoData);
      const response1 = await axios.post('http://localhost:9081/api/v1/details', pojoData);
      
      const doctorId = response12.data.doctorId; // Assuming the ID is in the response data

      localStorage.setItem("doctorid",doctorId);

  // Pass the ID as a query parameter when navigating
  
      alert('booking successful');

      console.log(response12);
      console.log(response1);

      setData(response12.data);
      // setSlotDetails(response12);
      // var responseconsultant = JSON.stringify(response12);

      // localStorage.setItem('response12', responseconsultant);
      //navigate(`/paymentconsult?id=${doctorId}`);

       navigate('/Payment',{state: {patientData: response12.data}});
     const res = response12.data;     

      setUnavailableSlots((prevUnavailableSlots) => [...prevUnavailableSlots, res.bookingTime]);
      setBookedSlots((prevBookedSlots) => [...prevBookedSlots, res]);
      setFormSubmitted(true);
      setLoading(false);
      e.target.reset();

      if (res.statusCode === "OK") {
        setUnavailableSlots([]);
        setBookedSlots([]);
        console.log(res);
        setAppointDetails(res);
       
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Add your form validation logic here

    return isValid;
  };

  return (
    <>
      <PatientNav></PatientNav>
      {/* <div className="container-fluid">
          <img className="img-fluid" src="https://i.pinimg.com/736x/97/53/52/975352ebd5f32f0bdaab8255379f5b3b.jpg" style={{width:'400px',marginTop:'400px'}}></img>
          <p>Skip the travel!</p>
            <p> Take A Slot For Doctor Consultation</p>
      </div> */}
      <div className="container-fluid">  
      <div className="opconslut">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3 style={{textAlign:"center"}}>Online And In-Patient Consulting</h3>

          <div className="form-group">
            <label htmlFor="speciality">Specialisation:</label>
            <select
              id="speciality"
              name="speciality"
              onChange={(e) => handleSpecialityChange(e.target.value)}
            >
              <option value="">Select Specialisation</option>
              {speciality.map((speciality, index) => (
                <option key={index} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctorName">Doctor Name:</label>
            <select id="doctorName" name="doctorName">
              <option value="">Select Doctor</option>
              {doctorNames.map((doctor, index) => (
                <option key={index} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hospitalName">Hospital Name:</label>
            <select id="hospitalName" name="hospitalName">
              <option value="">Select Hospital</option>
              {hospitalNames.map((hospital, index) => (
                <option key={index} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <select id="address" name="address">
              <option value="">Select Address</option>
              {address.map((address, index) => (
                <option key={index} value={address.id}>
                  {address.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="Experience">Experiences:</label>
            <select id="Experience" name="Experience">
              <option value=''>Select Experience</option>
              {experience.map((experience, index) => (
                <option key={index} value={experience.id}>
                  {experience.name}
                </option>
              ))}
            </select>
          </div>

         

          <h5>Available Dates:</h5>
          <div className="slot-dates-container">
            {slotDates.map((date) => (
              <div
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`slot-date ${date === selectedDate ? 'selected' : ''}`}
              >
                {date}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div>
             
             {allTimeSlots.map((time, index) => {
            const isUnavailable =
              unavailableSlots.includes(time) && unavailableSlotsDate.includes(selectedDate) &&
              bookedSlots.some(
                (slot) => slot.date === selectedDate && slot.time === time
              );

            return (
              <label
                key={index}
                className={`time-slot ${
                  isUnavailable
                    ? "unavailable"
                    : selectedTimeSlot === time
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="option-input radio"
                  name="timeSlot"
                  onChange={() => handleSlotClick(time)}
                  disabled={isUnavailable}
                  checked={selectedTimeSlot === time}
                />
                {time}
              </label>
            );
          })}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="patientName">Patient Name:</label>
            <input type="text" id="patientName" value={name} name="patientName"/>
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input type="text" id="patientId" value={particularItem} name="patientId"/>
          </div>

          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="email" id="patientEmail" name="patientEmail" />
          </div>

          <div className="form-group">
            <label htmlFor="patientMobileNumber">Patient Mobile Number:</label>
            <input type="tel" id="patientMobileNumber" value={phone} name="patientMobileNumber" />
          </div>

          <div className="form-group">
            <label htmlFor="typeOfService">Type of Service:</label>
            <select id="typeOfService" name="typeOfService" onChange={handleServiceChange}>
              <option value="service">Select Consulting</option>
              <option value="Online Consulting">Online Consulting</option>
              <option value="In-Patient/Walk-In">In-Patient/Walk-in </option>
            </select>
          </div>

          
          <div className="form-group">
            <label htmlFor="patientDescription">Patient Description:</label>
            <textarea
              id="patientDescription"
              name="patientDescription"
              defaultValue={""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fee">Fees:</label>
            <input
              id="fee"
              name="fee"
              value={fee}
            />
          </div>

          <div className="form-group">
            <label htmlFor="totalFee">TotalFee :</label>
            <input
              id="totalFee"
              name="totalFee"
              value={totalFee}
            />
          </div>



          <button type="submit" disabled={loading || formSubmitted || !selectedTimeSlot}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      </div>
      <FooterPage></FooterPage>
    </>
  );
}

export default TimeSlots;
