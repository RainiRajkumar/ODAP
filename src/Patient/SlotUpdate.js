

import React, { useEffect, useState } from "react";
import "./SlotBooking.css";
import FooterPage from "../Landpage/FooterPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientNav from "./PatientNav";
import { setAppointDetails } from "./Authstate";

function SlotUpdate() {


 



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
  const [patientName,setPatientName]=useState('');
  const [patientId,setPatientId]=useState('');
  const [patientMobileNumber,setPatientMobileNumber]=useState('');
  const [doctorId,setDoctorId]=useState('');


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const navigate = useNavigate('');
  const [unavailableSlotsDate, setUnavailableSlotsDate] = useState([]);

  const [typeOfService, setTypeOfService] = useState('');
 

  const [data,setData]=useState('');

  const handleServiceChange = (e) => {
    setTypeOfService(e.target.value);
    // Calculate fee based on selected service
    switch (e.target.value) {
    
      case 'Online Consulting':
       
        break;
      case 'In-Patient/Walk-In':
       
        break;
     
      default:
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

       
       

        setDoctorNames(doctorNames);
        setHospitalNames(hospitals);
        setAddress(addresses);
        
       
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

  
  
  const handleSubmit = async (e) => {
   
    e.preventDefault();

    if (!validateForm()) {
      return;
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
      address:e.target.address.value,
      speciality:e.target.speciality.value,  
      doctorId:e.target.doctorId.value,   
    };


    try {
      const response12 = await axios.put('http://localhost:9081/api/v1/updateservice', pojoData);
      const response1 = await axios.post('http://localhost:9081/api/v1/details', pojoData);
      
      alert('booking successful');

      console.log(response12);
      console.log(response1);

      setData(response12.data);
      // setSlotDetails(response12);
      // var responseconsultant = JSON.stringify(response12);

      // localStorage.setItem('response12', responseconsultant);


      navigate('/');
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
            <input type="text" id="patientName" value={patientName} onChange={(e)=>setPatientName(e.target.value)} name="patientName"/>
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient ID:</label>
            <input type="text" id="patientId" value={patientId} onChange={(e)=>setPatientId(e.target.value)} name="patientId"/>
          </div>

          <div className="form-group">
            <label htmlFor="doctorId">Consultation ID:</label>
            <input type="text" id="doctorId" value={doctorId} onChange={(e)=>setDoctorId(e.target.value)} name="patientId"/>
          </div>


          <div className="form-group">
            <label htmlFor="patientEmail">Patient Email:</label>
            <input type="email" id="patientEmail"  name="patientEmail" />
          </div>

          <div className="form-group">
            <label htmlFor="patientMobileNumber">Patient Mobile Number:</label>
            <input type="tel" id="patientMobileNumber" value={patientMobileNumber} onChange={(e)=>setPatientMobileNumber(e.target.value)} name="patientMobileNumber" />
          </div>

          <div className="form-group">
            <label htmlFor="typeOfService">Type of Service:</label>
            <select id="typeOfService" name="typeOfService" onChange={handleServiceChange}>
              <option value="service">Select Consulting</option>
              <option value="Online Consulting">Online Consulting</option>
              <option value="In-Patient/Walk-In">In-Patient/Walk-in </option>
            </select>
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

export default SlotUpdate;
