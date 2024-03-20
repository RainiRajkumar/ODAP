import React, { useState } from "react";
import './Doctorregistration.css'
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Doctorregistration(){
  
//   useLayoutEffect(() => {
//     window.scrollTo(0, 0)
// });  
  
  const[doctorName, setDoctorName] = useState('');
  const[speciality, setSpeciality] = useState('');
  const[experience, setExperience] = useState('');
  const[degree, setDegree] = useState('');
  const[hospitalName,setHospitalName]=useState('');
  const[currentworkplace, setCurrentworkplace] = useState('');
  const[address1, setAddress1] = useState('');
  const[otherworkplace, setOtherworkplace] = useState('');
  const[address2, setAddress2] = useState('');
  const[phonenumber, setPhonenumber] = useState('');
  const[email, setEmail] = useState('');
  const[registrationnumber, setRegistrationnumber] = useState('');
  const[registrationcouncil, setRegistrationcouncil] = useState('');
  const[registrationyear, setRegistrationyear] = useState('');
  const[password, setPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const[errorMessage, setErrorMessage] = useState('');
  const[error,setError] = useState('');
  const navigate = useNavigate('');
  
  const submit = async()=>{
    
    const data = {
      doctorName,
      speciality,
      degree,
      experience,      
      hospitalName,
      currentworkplace,
      address1,
      otherworkplace,
      address2,
      phonenumber,
      registrationnumber,
      registrationcouncil,
      registrationyear,
      email,
      password,
      confirmPassword,
    };
    try{
      setError(false);
      const digits = /[0-9]/;
      const emaildigit = /^[0-9]/;
      const alphabets = /[a-z]/;
      const passwordtest = /[0123456789@#qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFAZXCVBNM]/;
      const specialchars = /[!@#$%^&*()_+|}{:"?><}]/;
      const emailspecialchars = /[!#$%^&*()_+|}{":?><}]/;
      const emailend = /[@gmail.com | @Yahoo.com]/;
      
      // if(digits.test(doctorName) || specialchars.test(doctorName))
      //   throw new Error("Enter valid Firstname");
      // if(digits.test(speciality) || specialchars.test(speciality))
      //   throw new Error("Enter valid Speciality");
      // if(experience.length >2)
      //   throw new Error("Enter valid Experience");
      // if(digits.test(currentworkplace) || specialchars.test(currentworkplace))
      //   throw new Error("Enter valid Work place");
      // if(alphabets.test(phonenumber) || specialchars.test(phonenumber) || phonenumber.length !== 10)
      //   throw new Error("Enter valid Phone number")
      // if(emaildigit.test(email) || emailspecialchars.test(email))
      //   throw new Error("Enter valid Email")
      // if(password.length >8)
      //   throw new error("password must contain 8 characters");
      // if(password !== confirmPassword)
      //   throw new Error("The Password and Confirmpassword should match")
      
      const response =await axios.post('http://localhost:9099/api/DRData' ,data)
      setDoctorName('');
      setSpeciality('');
      setExperience('');
      setDegree('');
      setHospitalName('');
      setCurrentworkplace('');
      setAddress1('');
      setOtherworkplace('');
      setAddress2('');
      setPhonenumber('');
      setRegistrationnumber('');
      setRegistrationcouncil('');
      setRegistrationyear('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert("Doctor registration successful");
      console.log(response);
      navigate('/doctor');
      
    }
    catch(e){
      setError(true);
      setErrorMessage(e.message);
      }    
  }

  
  return(   
   <>
    <LandNav></LandNav>
    <div className="DRbg">
    
      <h4>Please Register Here.</h4>

      <div className="Container-fluid d-flex flex-row">
        {/* <div className="DRcard">
          <img className="DRimage" src="doctorregister.jpg"></img>
          <p>Please fill in the details to register yourself.</p>
        </div> */}
        <div>
        <table className="Doctable1">
          <tr>
            <td>Doctor Name :</td>
            <td><input type="text" id="Doctorfirstname" required value={doctorName} onChange={(e)=>setDoctorName(e.target.value)}></input></td>
          </tr>
          
          <tr>
            <td>Speciality :</td>
            <td><select id='Speciality' class="form-select form-select-sm" value={speciality} onChange={(e) => setSpeciality(e.target.value)} aria-label=".form-select-sm example" >
              <option selected>Specializaton</option>
              <option>Cardilogy</option>
              <option>Gastroenterology</option>
              <option>Dermatology</option>
              <option>Endocrinologists</option>
              <option>Neurology</option>
              <option>Oncologist</option>
              <option>Ophthalmology</option>
              <option>Hematology</option>
              <option>Nephrologist</option>
              <option>Allergist</option>
              <option>Obstetrics and Gynecology</option>
              <option>Dental</option>
            </select></td>
          </tr>
          <tr>
            <td>Degree :</td>
            <td><input type="text" id="Degree" required value={degree} onChange={(e)=>setDegree(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Hospital Name :</td>
            <td><input type="text" id="hospitalname" required value={hospitalName} onChange={(e)=>setHospitalName(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Experience :</td>
            <td><input type="number" placeholder="In years" required id="Experience" value={experience} onChange={(e)=>setExperience(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Current Workplace:</td>
            <td><select id='currentworkplace' class="form-select form-select-sm" value={currentworkplace} onChange={(e) => setCurrentworkplace(e.target.value)} aria-label=".form-select-sm example" >
              <option selected>Hospital name</option>
              <option>Care</option>
              <option>Yashoda</option>
              <option>Medicover</option>
              <option>Apollo</option>
            </select></td>
          </tr>
          <tr>
            <td>Address1 :</td>
            <td><input type="text" id="Address1" required value={address1} onChange={(e)=>setAddress1(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Otherworkplace :</td>
            <td><select id='otherworkplace' class="form-select form-select-sm" value={otherworkplace} onChange={(e) => setOtherworkplace(e.target.value)} aria-label=".form-select-sm example" >
              <option selected>Hospital name</option>
              <option>Care</option>
              <option>Yashoda</option>
              <option>Medicover</option>
              <option>Apollo</option>
            </select></td>
          </tr>
          <tr>
            <td>Address2 :</td>
            <td><input type="text" id="Address2" required value={address2} onChange={(e)=>setAddress2(e.target.value)}></input></td>
          </tr>
          </table>
          </div>
          <div className="Doctable2">
          <table>
          <tr>
            <td>Mobilenumber:</td>
            <td><input type="number" id="Phonenumber" required value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Email :</td>
            <td><input type="email" id="Email" value={email} required onChange={(e)=>setEmail(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Registered number :</td>
            <td><input type="number" id="Registerednumber" required value={registrationnumber} onChange={(e)=>setRegistrationnumber(e.target.value)} placeholder="License number"></input></td>
          </tr>
          <tr>
            <td>Registered council:</td>
            <td><select id='Registeredcouncil' class="form-select form-select-sm" value={registrationcouncil} onChange={(e) => setRegistrationcouncil(e.target.value)} aria-label=".form-select-sm example" >
              <option selected></option>
              <option>Andhra pradesh Medical Council</option>
              <option>Tamilnadu Medical Council</option>
              <option> Delhi Medical Council</option>
              <option>Maharastra Medical Council</option>
              <option>Karnataka Dental Council</option>
              <option>Medical Council of India</option>
            </select></td>
          </tr>
          <tr>
          <p style={{color:"red"}}>License obtained from which council</p>
          </tr>
          <tr>
            <td>Registered Year:</td>
            <td><input type="number" id="Registeredyear" required value={registrationyear} onChange={(e)=>setRegistrationyear(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Create Password:</td>
            <td><input type="password" id="Password" value={password} required onChange={(e)=>setPassword(e.target.value)}></input></td>
          </tr>
          <tr> 
            <td>Confirm Password:</td>
            <td><input type="password" id="ConfirmPassword" required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="should match the entered password"></input></td>
          </tr>
        </table>
        

        <button type='button' className="DRbtn" onClick={submit}>submit</button>
        {error && <p style={{ color: "royalblue" }}>{errorMessage}</p>}

        </div>
      </div>
      </div>
    <FooterPage></FooterPage>
    </>
  );
}