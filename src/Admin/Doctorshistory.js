

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import deleteDataById from './deleteDataById';
import FooterPage from '../Landpage/FooterPage';
import AdminDashboard from './AdminDashboard';
import { Link } from 'react-router-dom';

 
const Doctorshistory=()=>
{
   
const[ProfileData,setprofileData]=useState([]);

useEffect(() => {
  fetchData();
},[]);
  const fetchData =  () => {
    axios.get(`http://localhost:9081/api/v1/all`)
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

<AdminDashboard/>

<div class="container-fluid display-table" >
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{backgroundColor:"lightblue"}}>
                <div class="logo">
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180"  className='img-fluid'   />
                </div>
                <div class="navi">
                    <ul>
                    <li class="active"><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
                        <li><Link to="/adminpatienthistory"> <i class="bi bi-calendar2"></i>Patient History</Link></li>
                        <li><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
                        <li ><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment History</Link></li>
                        <li ><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 hidden-xs display-table-cell v-align">
                <div class="row">
                    <header>
                        <div class="col-md-12">

    <div className='profileimage' >
      <div className='container-fluid'>
       <br/>
          <p className='text-center fw-bold fs-2'>Admin Doctor History</p>       
           
  
      <table class="table table-striped">
        <thead>
        <tr>
          
          <th>Doctor Name</th>
          <th>Hospital Name</th>
          <th>Consultation ID</th>
          <th>Date</th>
          <th>Slot time</th>
          <th>Patient Email</th>
          <th>Patient PhoneNumber</th>
          <th>Patient ID</th>
          <th>Doctor Specialization</th>
          <th>Update</th>
          <th>Delete</th>
          {/* <th>View</th> */}
          
      
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.doctorId}>
                         
              <td>{data.doctorName}</td>
              <td>{data.hospitalName}</td>
              <td>{data.doctorId}</td>
              <td>{data.bookingDate}</td>
              <td>{data.bookingTime}</td>
              <td>{data.patientEmail}</td>
              <td>{data.patientMobileNumber}</td>
              <td>{data.patientId}</td>
              <td>{data.speciality}</td>       
              
             <Link to="/slotupdate"> <td><button type='submit' >Update</button></td></Link>
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

export default Doctorshistory;

