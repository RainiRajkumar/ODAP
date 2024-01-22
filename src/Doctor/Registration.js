import { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";



function Registration()
{

  const[doctorId,setDoctorId]=useState('');
	const[doctorFirstname,setDoctorFirstName]=useState('');
	const[doctorLastname,setDoctorLastName]=useState('');
	const[speciality,setSpeciality]=useState('');
	const[experience,setExperience]=useState('');
	const[dateofLicenseobtained,setDateofLicenseObtained]=useState('');
	const[countryofLicenseobtained,setCountryOfLicenseObtained]=useState('');
  const[currentWorkplace,setCurrentWorkplace]=useState('');
	const[phonenumber,setPhoneNumber]=useState('');
	const[licensenumber,setLicenceNumber]=useState('');
	const[email,setEmail]=useState('');
	const[password,setPassword]=useState('');
	const[confirmPassword,setConfirmPassword]=useState('');

    
  

    const submit = async () => {      
     
            
          
              const data = {
                  doctorId,
                  doctorFirstname,
                  doctorLastname,
                  speciality,
                  experience,
                  dateofLicenseobtained,
                  countryofLicenseobtained,
                  currentWorkplace,
                  licensenumber,
                  phonenumber,
                  email,                  
                  password,
                  confirmPassword,               
            
                  
              };
          
  
                  
      try {
        const response = await axios.post('http://localhost:8092//doctor/register' ,data);
        
          setDoctorId('');
          setDoctorFirstName('');
          setDoctorLastName('');
          setSpeciality('');
          setExperience('');
          setDateofLicenseObtained('');
          setCountryOfLicenseObtained('');
          setCurrentWorkplace('');
          setLicenceNumber('');
          setPhoneNumber('');
          setEmail('');         
          setPassword('');
          setConfirmPassword(''); 
          alert(" Registration successful... " );      
          console.log(response);
          
   
        }catch(error){
        
          console.log("error occured"+error);
        
        }
      }
    
    
     
    
        
     return(
          <>
<LandNav/>
      <div className="container-fluid bg-body-tertiary p-5" style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/99-998859_background-image-for-hospital.jpg)`}}>
         <h2 style={{textAlign:'center'}}>Doctor Registration</h2>
          <div className="row">
          <div className="col-12">
            <div className="container pt-4">
              <form className="row g-3">   
              <div className='col-md-6'>
              <label for='medicalInformation' >Doctor ID :</label>
              <input type='text' className="form-control" id='inputMedicalInformation' value={doctorId} onChange={(e)=>setDoctorId(e.target.value)} placeholder='enter medical information'/>
            </div> 
            <div className='col-md-6'>
              <label for='patientName'  text-primary fw-bold>Doctor First Name :</label> 
              <input type='text' className="form-control" id='inputPatientName' value={doctorFirstname} onChange={(e)=>setDoctorFirstName(e.target.value)} placeholder='enter patientname' required/>
            </div>
            <div className='col-md-6'>
              <label for='medicalInformation' >Doctor Last Name :</label>
              <input type='text' className="form-control" id='inputMedicalInformation' value={doctorLastname} onChange={(e)=>setDoctorLastName(e.target.value)} placeholder='enter medical information'/>
            </div>
            <div className='col-md-6'>
              <label for='mobileNumber' >Mobile :</label>
              <input type='tel' className="form-control" id='inputMobile'value={phonenumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='enter mobile number' required/>
            </div>
            <div className='col-md-6'>
              <span id='check-email'></span>
              <label for='email' >Email :</label>
              <input type='email' name='email' className="form-control" id='inputEmail' value={email} onChange={(e)=>setEmail(e.target.value)}
              placeholder='enter your email'/>
            </div>           

            <div className='col-md-6'>
              <label for='familyDoctorName' >Specialization :</label>
              <input type='text' id='inputfamilydoctorname' className="form-control" value={speciality} onChange={(e)=>setSpeciality(e.target.value)} placeholder='enter family doctor name'/>
            </div>
            <div className='col-md-6'>
              <label for='emergencyContact' >Experience :</label>
              <input type='tel' id='inputemergencycontactnumber' className="form-control" value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder='enter emergency contact number' required/>
            </div>
            <div className='col-md-6'>
              <label for='addressLine1' >Date of License:</label>
              <input type='text' id='inputaddressline1' className="form-control" value={dateofLicenseobtained} onChange={(e)=>setDateofLicenseObtained(e.target.value)} placeholder='enter Line 1'/>
            </div>
            <div className='col-md-6'>
              <label for='addressLine2' >Country of License :</label>
              <input type='text' id='inputaddressline2' className="form-control" value={countryofLicenseobtained} onChange={(e)=>setCountryOfLicenseObtained(e.target.value)} placeholder='enter Line 2'/>
            </div>
            <div className='col-md-6'>
              <label for='city' >CurrentWorkPlace :</label>
              <input type='text' id='inputcity' className="form-control" value={currentWorkplace} onChange={(e)=>setCurrentWorkplace(e.target.value)} placeholder='enter city'/>
            </div>
            <div className='col-md-6'>
              <label for='number' >Licence Number :</label>
              <input type='number' id='inputstate' className="form-control" value={licensenumber} onChange={(e)=>setLicenceNumber(e.target.value)} placeholder='enter state'/>
            </div>
          

            <div className='col-md-6'>
              <label for='password' >Password :</label>
              <input type='password' id='inputpassword' className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password'/>
            </div>
            <div className='col-md-6'>
              <label for='repassword' >Re-Password :</label>
              <input type='password' id='inputrepassword' className="form-control" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='re-enter password'/>
            </div>
           
          
           
            <div className='text-center'>
              <button type="button" className="btn btn-primary" onClick={submit} >Sign Up</button>
            </div> 
            <div className="p-3">
              <p>have an Account? <Link to='/doctorlogin'>Login here</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
<FooterPage/>
  </>
    )
}

export default Registration;