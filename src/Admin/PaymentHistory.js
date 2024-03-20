import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";
import FooterPage from "../Landpage/FooterPage";


function PaymentHistory()
{
    const [History, setHistory] = useState([]);
    const [diagnostic, setDiagnostic] = useState([]);
    const [medical,setMedical]=useState([]);
   

    useEffect(() => {
        fetchDiagnostic();
        
    }, []);

    // const fetchTechnician = () => {
    //     axios.get('http://localhost:9902/Registration/Tdata')
    //         .then(response => {
    //             setHistory(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching patient history:', error);
    //         });
    // };

    const fetchDiagnostic = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/patients/getpayments');
            setDiagnostic(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // const fetchMedical = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:9094/api/Patient/all');
    //         setMedical(response.data);
    //     } catch (error) {
    //         console.error('Error fetching appointments:', error);
    //     }
    // };


    return (

        <>
        <AdminDashboard/>
        <div class="container-fluid display-table" >
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{backgroundColor:"lightblue"}}>
                <div class="logo">
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                    <ul>
                    <li><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
                        <li><Link to="/adminpatienthistory"> <i class="bi bi-calendar2"></i>Patient History</Link></li>
                        <li ><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
                        <li class="active"><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment History</Link></li>
                        <li ><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                   
                    </ul>
                </div>
            </div>

            <div class="col-md-10 col-sm-11 hidden-xs display-table-cell v-align">
                <div class="row">
                        <div class="col-md-12">

    <div className='profileimage' >
      <div className='container-fluid'>
       <br/>
          
                <p className='text-center fw-bold fs-2'>Payment History</p>
                <table className="table table-hover">
                    <thead>
                        <tr>
                           
                            <th>Patient Name</th>
                            <th>Diagnostic Center</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Tests</th>
                            <th>Address</th>
                            <th>Collection</th>
                            <th>Diagnostic Address</th>
                            <th>Patient Mobile</th>
                            <th>Amount</th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {diagnostic.map(patient => (
                            <tr key={patient.patientId}>
                                
                                <td>{patient.patientName}</td>
                                <td>{patient.diagnosticCenter}</td>
                                <td>{patient.bookingDate}</td>
                                <td>{patient.bookingTime}</td>
                                <td>{patient.tests}</td>
                                <td>{patient.addressLine1}</td>
                                <td>{patient.collection}</td>
                                <td>{patient.address}</td>
                                <td>{patient.patientMobileNumber}</td>
                                <td>{patient.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
              </div>
</div>

            </div>
            </div>
        </div>
</div>
</div>

            
        <FooterPage/>
        
        </>
    )
}


export default PaymentHistory;