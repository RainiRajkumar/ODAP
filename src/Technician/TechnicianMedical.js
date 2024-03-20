import React from "react";
import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Technicianpatientslot.css'
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
import Techniciannavbar from "../Landpage/Techniciannavbar";
import { getTechnicianDetails } from "../Patient/Authstate";


export default function MedicalSlots() {

  const [patient, setpatient] = useState([]);

  // useEffect(() => {
    
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:9094/api/Patient/all");
  //       setpatient(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  },[]);
  const technician = getTechnicianDetails();
  const fetchData =  () => {
    axios.get(`http://localhost:9085/api/getname/${technician.typeofservices}`)
        .then((response)=>{
        console.log(response);
        setpatient(response.data);
      })
        
      .catch((error)=> {
        console.error("Error fetching data:", error);
      });
    };
  
  



  return (
    
    <>


<Techniciannavbar/> 
<div className="container-fluid d-flex flex-row">
            
            <div className="col-2 technicianSidebar">
                <img src="technician.jpg" className="technicianimg"></img>
                <p><Link to='/technicianDashboard'>Profile</Link></p>
                <p><Link to='/Technicianpatientslot'>Patient slots</Link></p>
                <p><Link to='/medicalslots'>Medical slots</Link></p>
                <p><Link to='/Technicianreportform'>Report form</Link></p>
                <p><Link to='/Techniciansendreports'>Send reports</Link></p>
                <p><Link to='/Technicianlandpage'>Logout</Link></p>
            
            </div>
            <div className="col-10">
      <div>
      <div className="container" style={{backgroundColor:'white'}}>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Pateint Name</th>
                <th scope='col'>Type of services</th>
                <th scope="col">Booking date</th>
                <th scope="col">Booking time</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Patient Email</th>


              </tr>
            </thead>
            <tbody>

         
              {patient.map((data) => (
                <tr key={data.id}>
                  {/* <th scope="row">{index + 1}</th> */}
                  <td >{data.patientName}</td>
                  <td>{data.typeofservices}</td>
                  <td >{data.bookingdate}</td>
                  <td >{data.slottime}</td>
                  <td >{data.patientMobileNumber}</td>
                  <td>{data.email}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      </div>
            
            </div>
            
            <FooterPage></FooterPage>
     
    </>
  );
}