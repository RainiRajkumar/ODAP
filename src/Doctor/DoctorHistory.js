

import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import DoctorDashboard from './DoctorDashboard';
import { getDoctorDetails } from '../Patient/Authstate';
import FooterPage from '../Landpage/FooterPage';
 
const DoctorHistory=()=>
{
   
const[ProfileData,setprofileData]=useState([]);


          
useEffect(() => {
  fetchData();
},[]);
const doctor = getDoctorDetails();
const fetchData =  () => {
  axios.get(`http://localhost:8092/byname/${doctor.doctorFirstname}`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };


// Empty dependency array ensures useEffect runs only once on component mount

  
    return (
      <>

  <DoctorDashboard/>
  
    <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
      <div className='container-fluid'>      
      <div className='doctor-info1 d-flex'>
                <div className='doctor-pic1'>
                    <img src='https://static.vecteezy.com/system/resources/thumbnails/028/287/384/small/a-mature-indian-male-doctor-on-a-white-background-ai-generated-photo.jpg' alt='Doctor' />
                   
                </div>
                <div className='doctor-details1 p-5'>
                   <strong><p>Doctor ID: {doctor.doctorId}</p></strong>
                    <p>Doctor Name: {doctor.doctorFirstname}</p>
                    <p>Specialization: {doctor.speciality}</p>
                  
                </div>
            </div>
          <div className='row'>
              <div className='col-12'>
                 <p className='text-center fw-bold fs-2'>{doctor.doctorFirstname} History</p>
         
  
  <div>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Date</th>         
          <th>Patient Email</th>
          <th>Patient Name</th>
          <th>Slot time</th>         
          <th>Suggestion</th>
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.id}>                         
              <td>{data.bookingdate}</td>             
              <td>{data.email}</td>
              <td>{data.patientName}</td>
              <td>{data.slottime}</td>             
              <td>{data.suggestion}</td>              
            </tr>
         ) )
        }
        </tbody>
      </table>
    </div>
          </div>
        </div>
      </div>
    </div>
    <FooterPage/>
        </>
    )
}

export default DoctorHistory;

