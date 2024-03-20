import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FooterPage from '../Landpage/FooterPage';
import AdminDashboard from './AdminDashboard';

const AdminPatientHistory = () => {
    const [patientHistory, setPatientHistory] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetchPatientHistory();
        fetchData();
        // fetchSlots();
    }, []);

    const fetchPatientHistory = () => {
        axios.get('http://localhost:8098/getall/patients')
            .then(response => {
                setPatientHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient history:', error);
            });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9081/api/v1/all');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // const fetchSlots = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/patients/all');
    //         setSlots(response.data);
    //     } catch (error) {
    //         console.error('Error fetching slots:', error);
    //     }
    // };


    const handleDelete = async (patientId) => {
        try {
            await axios.delete(`http://localhost:8098/api/delete/${patientId}`);
            setPatientHistory(patientHistory.filter(patient => patient.patientId !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    

    return (
        <>
            <AdminDashboard />
            
<div class="container-fluid display-table" >
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation" style={{backgroundColor:"lightblue"}}>
                <div class="logo">
                        <img src="https://tse3.mm.bing.net/th?id=OIP._R4XgIfrkq4ZFFF55wxhWQHaHa&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                    <ul>
                    <li><Link to="/admindoctor"><i class="bi bi-calendar2"></i>Doctor History</Link></li>
                        <li class="active"><Link to="/adminpatienthistory"> <i class="bi bi-calendar2"></i>Patient History</Link></li>
                        <li><Link to="/tech"> <i class="bi bi-calendar2"></i>Technician History</Link></li>
                        <li ><Link to="/paymenthistory"> <i class="bi bi-calendar2"></i>Payment History</Link></li>
                        <li ><Link to="/contact"><i class="bi bi-person-lines-fill"></i>Doctor Contact</Link></li>
                        <li><Link to="/"><i class="bi bi-box-arrow-right"></i>Log-Out</Link></li>
                    </ul>
                </div>
            </div>
            <div className='container-fluid'>
                <div class="col-md-10 col-sm-11 hidden-xs display-table-cell v-align box display-table-cell v-align">
             
                <p className='text-center fw-bold fs-2'>Patient History</p>
                <table className="responsive-table " style={{overflowX:"auto"}}>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Mobile Number</th>
                            <th>Insurance</th>
                            <th>Disease</th>
                            <th>Doctor Name</th>
                            <th>Hospital Name</th>
                            <th>Slot Date</th>
                            <th>Time</th>

                            {/* <th>Diagnostic Center</th>
                            <th>Service Type</th>
                            <th>Date</th>
                            <th>Time</th> */}
                            {/* <th>Update</th> */}
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientHistory.map(patient => (
                            <tr key={patient.patientId}>
                                <td>{patient.patientId}</td>
                                <td>{patient.patientName}</td>
                                <td>{patient.patientMobileNumber}</td>
                                <td>{patient.medicalInsurances}</td>
                                <td>{patient.chronicDisease}</td>
                                {appointments.map(appointment => (
                                    appointment.patientId === patient.patientId &&
                                    <React.Fragment key={appointment.appointmentId}>
                                        <td>{appointment.doctorName}</td>
                                        <td>{appointment.hospitalName}</td>
                                        <td>{appointment.bookingDate}</td>
                                        <td>{appointment.bookingTime}</td>
                                    </React.Fragment>
                                ))}
                                {/* {slots.map(slot => (
                                    slot.patientId === patient.patientId &&
                                    <React.Fragment key={slot.slotId}>
                                        <td>{slot.diagnosticCenter}</td>
                                        <td>{slot.testServiceDetails}</td>
                                        <td>{slot.bookingDate}</td>
                                        <td>{slot.bookingTime}</td>
                                    </React.Fragment>
                                ))} */}
                                {/* <td>
                                <Link to="/slotupdate"><button type='button'>Update</button></Link> 
                                </td> */}
                                <td>
                                    <button type='button' onClick={() => handleDelete(patient.patientId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
                
              </div>

            </div>
        </div>
    </div>
            <FooterPage />
        </>
    );
};

export default AdminPatientHistory;
