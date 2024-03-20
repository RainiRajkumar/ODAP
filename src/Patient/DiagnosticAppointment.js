

import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { getPatientDetails } from '../Patient/Authstate';
import FooterPage from '../Landpage/FooterPage';
import { Link } from 'react-router-dom';
import PatientNav from './PatientNav';

const DiagnosticAppointments=()=>
{
   
const[ProfileData,setprofileData]=useState([]);


var storedResponseString = localStorage.getItem('loggedIn');

// Convert the string back to an object
var storedResponse = JSON.parse(storedResponseString);

// Access the particular item within the response object
var particularItem = storedResponse.patientId;
var name= storedResponse.patientName;
var phone= storedResponse.patientMobileNumber;


          
useEffect(() => {
  fetchData();
},[]);

const fetchData =  () => {
  axios.get(`http://localhost:9094/api/Patient/getbypatientnames/${name}`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };

 



const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};
  

  
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
                        <li><Link to="/patientdashboard"><i class="bi bi-house-fill" ></i>Features</Link></li>
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
                        <li ><Link to='/' onClick={handleNavigation} ><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


            <div class="col-md-10 col-sm-11 display-table-cell v-align">
            <div className='container-fluid'> 
                <div class="row">
                    <header>


                  <div class="col-md-12"> 
        
                 <p className='text-center fw-bold fs-2'>Appointments</p>
         
  <div  className='table'>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Patient Name</th>      
          <th>Patient Mobile Number</th>           
          <th>patient Email</th>
          <th>Diagnostic Center</th>
          <th>Address</th>
          <th>Booking Time</th>
          <th>Booking Date</th>
          <th>Referral Doctor Name</th>
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(       
       
            <tr key={data.id}>                         
              <td>{data.patientName}</td>     
              <td>{data.patientMobileNumber}</td>                    
              <td>{data.patientEmail}</td> 
              <td>{data.diagnosticCenter}</td>
              <td>{data.address}</td>
              <td>{data.bookingTime}</td>           
              <td>{data.bookingDate}</td>
              <td>{data.referralDoctorName}</td>
            </tr>
         ) )
        }
        </tbody>
      </table>
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

export default DiagnosticAppointments;



