

import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import FooterPage from '../Landpage/FooterPage';
import deleteDataById from '../Admin/deleteDataById';
import { Link } from 'react-router-dom';


const Patientslots=()=>
{
   
const[ProfileData,setprofileData]=useState([]);

var [date,setDate] = useState(new Date());
    
useEffect(() => {
    var timer = setInterval(()=>setDate(new Date()), 1000 )
    return function cleanup() {
        clearInterval(timer)
    }  
});

  
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};



  
var doctors = localStorage.getItem('loggedIn');

// Convert the string back to an object
var stored = JSON.parse(doctors);

// Access the particular item within the response object
var dname = stored.doctorName;
var spec=stored.speciality;
var id=stored.doctorId;

          
useEffect(() => {
  fetchData();
},[]);
const fetchData =  () => {
  axios.get(`http://localhost:9081/api/v1/get/${dname}`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };

  
  const handleDeleteById = async (doctorId) => {
    try {
      await deleteDataById(doctorId);
      setprofileData((prevData) => prevData.filter(data => data.doctorId !== doctorId));
    } catch (error) {
      // Handle error if needed
    }
  };


  

  
    return (
      <>


<DoctorDashboard/>

      
     

        <div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="  container-fluid col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                        <img src="https://tse4.mm.bing.net/th?id=OIP.XsFTO6Tr5I4mfdTm3qsmBQAAAA&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                <ul>
                <li><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li class="active" ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        <li ><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li>
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>


      
            <div className='container-fluid'> 
                <div class="row">
                    <header>
                    <div class="col-md-12"style={{backgroundImage:`url(https://universalbackground.com/wordpress/wp-content/uploads/2016/07/shutterstock_111725270.jpg)`, backgroundSize: 'cover', height: '100vh'}}>     
          <div className='profileimage' >
      <div className='doctor-info1 d-flex'>
                <div className='doctor-pic1'>
                  <br/>
                <img src='http://clipart-library.com/img/1306694.png' style={{height:"200px",width:'250px'}} alt='Doctor' />
                   
                </div>
                <div className='container-fluid p-5'>
                    <p>Doctor ID: {id}</p>
                    <p>Doctor Name: {dname}</p>
                    <p>Specialization: {spec}</p>
                  
                </div>
            </div>
        
                 <p className='text-center fw-bold fs-2'>Booked Appointment Schedules</p>
         
      <div className='table-responsive'>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Patient Name</th>   
          <th>Patient ID</th>   
          <th>Patient Mobile Number</th>           
          <th>Hospital Name</th>
          <th>Type of Service</th>
          <th>Patient Description</th>
          <th>Slot time</th>
          <th>Booking Date</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(        
       
        
            <tr key={data.id}>                         
              <td>{data.patientName}</td>  
              {/* <td>{data.patientId}</td>  */}
              <td>{data.patientId}</td>  
              <td>{data.patientMobileNumber}</td>                    
              <td>{data.hospitalName}</td> 
              <td>{data.typeOfService}</td>
              <td>{data.patientDescription}</td>
              <td>{data.bookingTime}</td>           
              <td>{data.bookingDate}</td>
              <td><button type='submit' onClick={() => handleDeleteById(data.doctorId)}>Delete</button></td>
   
            </tr>
         ) )
        }
        </tbody>
      </table>
    </div>
         
      </div>
    </div>


  
                    </header>
                </div>
              
    </div>  
            </div>
        </div>

    
    <FooterPage/>






        </>
    )
}

export default Patientslots;

