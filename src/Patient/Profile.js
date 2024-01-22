
import React, { useEffect, useState } from 'react';
import { getPatientDetails } from './Authstate';



function Profile() {
  const [patientProfile, setPatientProfile] = useState([]);

  useEffect(() => {
    const patientDetails = getPatientDetails();
    if (patientDetails) {
      fetch(`http://localhost:8092/get/${patientDetails.patientId}`)
        .then((response) => response.json())
        .then((profileData) => {
          setPatientProfile(profileData);
          console.log(profileData);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, []); 

  return (
    <>


  <div className='profileimage' style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/11-119970_medical-wallpapers-doctor-background-hd.jpg)`,height:'1000px'}}>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12'>
               <p className='text-center fw-bold fs-2'>Personal Information </p>
               {Object.keys(patientProfile).length > 0 && (
                  <div className='profile' >
    
                <p><span className='fw-bold'>Patient ID:</span> {patientProfile.patientId}</p>
                <p><span className='fw-bold'>Patient Name:</span> {patientProfile.patientName}</p>
                <p><span className='fw-bold'>Mobile No:</span> {patientProfile.phoneNumber}</p>
                <p><span className='fw-bold'>Email:</span> {patientProfile.email}</p>                
                <p><span className='fw-bold'>Chronic Disease:</span> {patientProfile.chronicDisease}</p>               
                <p><span className='fw-bold'>Address Line1:</span> {patientProfile.addressLine1}</p>
                <p><span className='fw-bold'>Address Line2:</span> {patientProfile.addressLine2}</p>
                <p><span className='fw-bold'>city:</span> {patientProfile.city}</p>
                <p><span className='fw-bold'>state:</span> {patientProfile.state}</p>
                <p><span className='fw-bold'>Pincode:</span> {patientProfile.pincode}</p>
               
            </div>
          )}

        </div>
      </div>
    </div>
  </div>


   
    </>
  );
}

export default Profile;
