import React from "react";
import PatientNav from "./PatientNav";
import FooterPage from "../Landpage/FooterPage";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import '..//Patient/search.css';

function Search()
{

    // const [doctorNames, setDoctorNames] = useState([]);
    // const [hospitalNames, setHospitalNames] = useState([]);
    // const [speciality, setspeciality] = useState([]);
    // const [address, setAddress] = useState([]);
    const [search, setSearch] = useState('');
    const [searchaddress,setsearchExperience]=useState('');
    const [doctors, setDoctors] = useState([]);

    
  var storedResponseString = localStorage.getItem('loggedIn');

  // Convert the string back to an object
  var storedResponse = JSON.parse(storedResponseString);
  
  // Access the particular item within the response object
  var particularItem = storedResponse.patientId;
  
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};
useEffect(() => {
  // Fetch all doctors initially
  fetchDoctors();
}, []);

const fetchDoctors = async () => {
  try {
    const response = await axios.get('http://localhost:9099/api/getAll');
    setDoctors(response.data);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
};

const filteredDoctors = doctors.filter(doctor =>
  doctor.speciality.toLowerCase().includes(search.toLowerCase())
);





// const handleSearch = async () => {
//   try {
//     const response = await axios.get(`http://localhost:9099/api/doctors/search?speciality=${searchTerm}`);
//     setDoctors(response.data);
//   } catch (error) {
//     console.error('Error searching doctors:', error);
//   }
// };

// const handleChange = (event) => {
//   setSearchTerm(event.target.value);
// };
    // useEffect(() => {
    //     async function fetchSpecialities() {
    //       try {
    //         const response = await axios.get("http://localhost:9099/api/getAll");
    //         const data = response.data;
    
    //         if (Array.isArray(data)) {
    //           const specialityList = [...new Set(data.map((item) => item.speciality))];
    //           setspeciality(specialityList);
    //         } else {
    //           console.error("Invalid data structure:", data);
    //         }
    //       } catch (error) {
    //         console.error("Error fetching specialities:", error);
    //       }
    //     }
    
    //     fetchSpecialities();
    //   }, []);
    
    //   const handleSpecialityChange = async (selectedValue) => {
    //     try {
    //       const response = await axios.get(`http://localhost:9099/api/getSpecility/${selectedValue}`);
    //       const data = response.data;
    
    //       if (Array.isArray(data)) {
    //         const doctorNames = data.map(doctor => ({ name: doctor.doctorName }));
    //         const hospitals = data.map(doctor => ({ name: doctor.hospitalName, id: doctor.hospitalId }));
    //         const addresses = data.map(doctor => ({ name: doctor.address2, id: doctor.address2 }));
            
    
    
    //         setDoctorNames(doctorNames);
    //         setHospitalNames(hospitals);
    //         setAddress(addresses);
    //       } else {
    //         console.error("Invalid data structure:", data);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };
return (
    <>

  
<PatientNav/>


<div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" style={{backgroundColor:'lightgreen'}} id="navigation">
                <div class="logo">
                  <img src="https://www.freeiconspng.com/thumbs/patient-icon/patient-icon-1.png" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                <ul>
                        <li class="active"><Link to='#'><i class="fa fa-home"></i> ID :{particularItem}</Link></li>
                        <li ><Link to="/patientdashboard"><i class="bi bi-house-fill" ></i>Features</Link></li>
                        <li ><Link to="/profile"> <i class="bi bi-person-fill" ></i>Profile</Link></li>
                        <li class="active"><Link to="/search"> <i class="bi bi-search" ></i>Search</Link></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="bi bi-calendar2-fill"></i> Appointments</a>
                        <ul className="dropdown">
                           <li><Link to="/appointments">View Appointments</Link></li>
                           <li><Link to="/medicalappointments">Medical Appointment</Link></li>
                           <li><Link to="/diagnosticappointment">Diagnostic Appointment</Link></li>                          
                        </ul>
                        </li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
                <div class="row">
                    <header>
                  <div class="col-md-12"> 



    {/* <div >
        <form>

          <div className="form-group">
            <label htmlFor="speciality">Specialisation:</label>
            <select
              id="speciality"
              name="speciality" 
              onChange={(e) => handleSpecialityChange(e.target.value)}
            >
              <option value="" >Select Specialisation</option>
              {speciality.map((speciality, index) => (
                <option  key={index} value={speciality}>
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
        </form>
        </div> */}
  <div>
  <h1>Doctor List</h1>
            <div>
            <input
                type="text"
                placeholder="Search by specialty"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            
           
            
          </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Speciality</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>{doctor.doctorId}</td>
                            <td>{doctor.doctorName}</td>
                            <td>{doctor.speciality}</td>

                        </tr>
                    ))}
                </tbody>
            </table> */}
             <div className="doctor-cards">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.doctorId} className="doctor-card">
                        <h2>Dr.{doctor.doctorName}</h2>
                        <p>Speciality: {doctor.speciality}</p>
                        <p>Hospital: {doctor.hospitalName}</p>
                        <p>Experience: {doctor.experience}</p>
                        <p>Registered Number: {doctor.registrationnumber} </p>
                        <p>Registered Year: {doctor.registrationyear}</p>
                        <p>Registered Council: {doctor.registrationcouncil} </p>
                        <p>Degree: {doctor.degree}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
              
            </div>
    </div>







</div>
</header>
</div>

</div>  
</div>
</div>

</div>
<FooterPage/>
</>
)
}

export default Search;