
import '../App.css';
import 'bootstrap-icons/bootstrap-icons.svg';
import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import FooterPage from '../Landpage/FooterPage';
import PatientNav from './PatientNav';

const PatientDashboard=()=>
{
  

  const [doctorNames, setDoctorNames] = useState([]);
  const [hospitalNames, setHospitalNames] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [address, setAddress] = useState([]);

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
    return(
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
                        <li class="active"><Link to="/patientdashboard"><i class="bi bi-house-fill" ></i>Features</Link></li>
                        <li ><Link to="/profile"> <i class="bi bi-person-fill" ></i>Profile</Link></li>
                        <li ><Link to="/search"> <i class="bi bi-search" ></i>Search</Link></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="bi bi-calendar2-fill"></i> Appointments</a>
                        <ul className="dropdown">
                           <li><Link to="/appointments">View Appointments</Link></li>
                           <li><Link to="/medicalappointments">Medical Appointment</Link></li>
                           <li><Link to="/diagnosticappointment">Diagnostic Appointment</Link></li>                          
                        </ul>
                        </li>
                        {/* <li ><Link to="/appointments"><i class="bi bi-calendar2-fill"></i>Appointments</Link></li> */}
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>

              
            </div>

            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
                <div class="row">
                    <header>

                  <div class="col-md-11 col-sm-11 display-table-cell v-align">
    
    <div>
  <form>
    <div className="d-flex flex-row justify-content-center">
    <div className="form-group" style={{padding:"10px"}}>
      <label htmlFor="speciality">Specialisation:</label>
      <select
        style={{width:"190px"}}
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
  
   
  
   
    <div className="form-group" style={{padding:"10px"}}>
      <label htmlFor="address">Address:</label>
      <select
                    style={{width:"190px"}}
      id="address" name="address">
        <option value="">Select Address</option>
        {address.map((address, index) => (
          <option key={index} value={address.id}>
            {address.name}
          </option>
        ))}
      </select>
    </div>
    </div>
  </form>
  </div>
  
      
      <div className="container-fluid">

        <div className="row p-3 ">          
          <div className="col-sm-3 col-md-6" style={{paddingLeft:'80px',paddingRight:'80px'}}>
          <a href="/slotbooking"><img  className="landimage" src="https://www.wns.co.za/Portals/3/Images/HeaderBanner/desktop/5863/105/consulting_HD.jpg" style={{height:'250px',width:'300px'}} alt=""></img></a>
          <br/>
            <p style={{textAlign:'center'}}>Consultation services</p>
            {/* <div className="btn btn-warning" ><a href="/slotbooking" >Appointment</a></div> */}
           

          </div>

          
          <div className="col-sm-3 col-md-6" style={{paddingLeft:'80px',paddingRight:'80px'}} >
          <a href="/medical"><img className="landimage" src="https://tse2.mm.bing.net/th?id=OIP.QmO1AvhIrqFxpo-E0cSsFQHaEK&pid=Api&P=0&h=180" style={{height:'250px',width:'300px'}} alt=""></img></a>
           <br/>
            <p style={{textAlign:'center',height: "150px", width: "300px" }}>Medical Services</p>
            {/* <div className="btn btn-warning"><a href="/medical">BookNow</a></div> */}
           

          </div>

          </div>
          
          <div className="row p-3 ">   
          <div className="col-sm-3 col-md-6" style={{paddingLeft:'80px',paddingRight:'80px'}}>
          <a href="/form"><img className="landimage" src="https://wallpaperaccess.com/full/1483985.jpg" style={{height:'250px',width:'300px'}} alt=""></img></a>
            <br/>
            <p style={{textAlign:'center'}}>Diagnostic services</p>
            {/* <div className="btn btn-warning"><a href="/diagnostic">Book Test</a></div><br/> */}

         
          </div>
          <div className="col-sm-3 col-md-6" style={{paddingLeft:'80px',paddingRight:'80px'}}>
          <a href="/ambulance"><img className="landimage" src="https://www.pngmart.com/files/13/Ambulance-Force-Traveller-Transparent-PNG.png" style={{height:'250px',width:'300px'}} alt=""></img></a>
          <br/>
            <p style={{textAlign:'center'}}>Ambulance Services</p>
            {/* <div className="btn btn-warning"><a href="/ambulance">Book</a></div> */}
            
           
          
          
        </div>
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

export default PatientDashboard;