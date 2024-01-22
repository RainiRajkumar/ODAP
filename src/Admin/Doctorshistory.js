

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import deleteDataById from './deleteDataById';
import Navbar from '../Navbar';
 
const Doctorshistory=()=>
{
   
const[ProfileData,setprofileData]=useState([]);

useEffect(() => {
  fetchData();
},[]);
  const fetchData =  () => {
    axios.get(`http://localhost:8092/get/allpatients`)
      .then((response)=>{
      console.log(response);
      setprofileData(response.data);
    })
      
    .catch((error)=> {
      console.error("Error fetching data:", error);
    });
  };

  


  const handleDeleteById = async (id) => {
    try {
      await deleteDataById(id);
      setprofileData((prevData) => prevData.filter(data => data.id !== id));
    } catch (error) {
      // Handle error if needed
    }
  };







  
  // const handleviewById = async (id) => {
  //   try {
  //     await viewpatient(id);
  //     //setprofileData((prevData) => prevData.filter(data => data.id !== id));
  //   } catch (error) {
  //     // Handle error if needed
  //   }
  // };




  
  
// Empty dependency array ensures useEffect runs only once on component mount

  
    return (
      <>

<Navbar/>
    <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
      <div className='container-fluid'>
       
          <p className='text-center fw-bold fs-2'>Admin Doctor History</p>       
           
      <table class="table table-striped">
        <thead>
        <tr>
          
          <th>Doctor Name</th>
          <th>Hospital Name</th>
          <th>Date</th>
          <th>Slot time</th>
          <th>Patient Email</th>
          <th>Patient Name</th>          
          <th>Patient PhoneNumber</th>
          <th>Delete</th>
          {/* <th>View</th> */}
          
      
        </tr>
        </thead>
        <tbody>
        {ProfileData.map((data)=>(         
       
        
            <tr key={data.id}>
                         
              <td>{data.doctorFirstname}</td>
              <td>{data.hospitalname}</td>
              <td>{data.bookingdate}</td>
              <td>{data.slottime}</td>
              <td>{data.email}</td>
              <td>{data.patientName}</td>              
              <td>{data.phoneNumber}</td>
              <td><button type='submut' onClick={() => handleDeleteById(data.id)}>Delete</button></td>
              {/* <td><button type='submut' onClick={() => handleviewById(data.id)}>View</button></td> */}
              
            </tr>
         ) )
        }
        </tbody>
      </table>
    </div>
          </div>
   

        </>
    )
}

export default Doctorshistory;

