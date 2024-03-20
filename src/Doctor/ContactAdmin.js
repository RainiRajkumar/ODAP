import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterPage from "../Landpage/FooterPage";
import DoctorDashboard from "./DoctorDashboard";
import './Contact.css';


export default function ContactAdmin(){
    
    const [doctorId, setDoctorid] = useState('');
    const [doctorName, setDoctorname] = useState('');
    const [phoneNumber, setDoctorphonenumber] = useState('');
    const [email, setDoctoremail] = useState('');
    const [description, setDescription] = useState('');
    
    const submit = async() =>{
        const data = {
            doctorId,
            doctorName,
            phoneNumber,
            email,
            description,
        };
        try{

            const digits = /[0123456789]/
            const chars = /[qwertyuioplkjhgfdsazxcvbnm]/
            const specialchars = /[~!@#$%^&*()_+{}|":<>?,./;'[]\`-=]/
            if(doctorId.length == " ")
            alert("Enter the doctor Id")
            if(digits.test(doctorName) || specialchars.test(doctorName) || doctorName.length == " ")
            alert("Enter valid doctor name")
            if(chars.test(phoneNumber) || specialchars.test(phoneNumber) || phoneNumber.length == " ")
            alert("Entervalid mobilenumber")
            if(specialchars.test(description) || digits.test(description) || description.length == " ")
            alert("Enter a chars only")
            if(!email.endsWith('@gmail.com') || email.length == " ")
            alert("Entervalid email Id")


            const response = await axios.post('http://localhost:9099/contactadmin', data);
            setDoctorid('');
            setDoctorname('');
            setDoctoremail('');
            setDoctorphonenumber('');
            setDescription('');
            

        }
        catch (error) {
                    console.error('Error:', error.message);
                }
    }
      
const handleNavigation = () => {
    // Clear localStorage
    localStorage.clear();
  };


    return(
      <>
     <DoctorDashboard/>
     <div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                        <img src="https://tse4.mm.bing.net/th?id=OIP.XsFTO6Tr5I4mfdTm3qsmBQAAAA&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                <ul>
                        <li ><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        <li ><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li>
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li class="active"><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align">
                <div class="row">
                    <header>
                        <div class="col-md-10" style={{backgroundImage:'url(https://wallpapercave.com/wp/wp6944106.jpg)', height:'600px'}}> 



        <div>
            <table>
                <tr>
                    <td>Doctor Id:</td>
                    <td><input type="text" value={doctorId} onChange={(e)=>setDoctorid(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td>Doctor Name:</td>
                    <td><input type="text" value={doctorName} onChange={(e)=>setDoctorname(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td>Doctor PhoneNumber:</td>
                    <td><input type="number" value={phoneNumber} onChange={(e)=>setDoctorphonenumber(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td>Doctor Email:</td>
                    <td><input type="email" value={email} onChange={(e)=>setDoctoremail(e.target.value)} required></input></td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td><textarea value={description} rows={5} cols={50} onChange={(e)=>setDescription(e.target.value)}></textarea> </td>
                </tr>
           <tr>
                    <td></td>
                    <td><button onClick={submit}>submit</button></td>
           </tr>
            </table>
        </div>
        {/* <div className="contactinfo">
            <img className="contactimg" src="contact.jpg"></img>
            <p>Please describe your query here and our administration will get back to you.</p>
            <p>or</p>
            <p>contact us at</p>
            <p>Mobile number :9909089089</p>
            <p>Email :mailto:odapadmin@gmail.com</p>
        </div> */}
        </div>
                    </header>
                </div>
                
            </div>
        </div>

    </div>
    <FooterPage/>
      </>  
    );
}









