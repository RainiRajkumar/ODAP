
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './Patient/Login';
import Register from './Patient/Register';
import PatientDashboard from './Patient/PatientDashboard';
import Profile from './Patient/Profile';
import Doctorlogin from './Doctor/Doctorlogin';
import DoctorDashboard from './Doctor/DoctorDashboard';
import ForgotPassword from './Patient/ForgotPassword';
import Changepassword from './Patient/changepassword';
import deleteDataById from './Admin/deleteDataById';
import DoctorHistory from './Doctor/DoctorHistory';
import Doctorshistory from './Admin/Doctorshistory';
import MedicalServicesHome from './Patient/MedicalServicesHome';
import MedicalService from './Patient/MedicalService';
import OnlineService from './Patient/OnlineService';
import Landpage from './Landpage/Landpage';
import LandNav from './Landpage/LandNav';
import FooterPage from './Landpage/FooterPage';
import Diagnostic from './Patient/Diagnostic';
import Patientslots from './Doctor/Patientslots';
import Treat from './Doctor/Treat';
import TimeSlots from './Patient/SlotBooking';
import PatientNav from './Patient/PatientNav';
import Payment from './Patient/Payment';
import Doctorregistration from './Doctor/DoctorRegistration';
import AdminDashboard from './Admin/AdminDashboard';
import AdminLogin from './Admin/AdminLogin';
import Technicianafterlogin from './Technician/Technicianafterlogin';
import Technicianlandpage from './Technician/Technicianlandpage';
import Technicianlogin from './Technician/Technicianlogin';
import Technicianpatientslot from './Technician/Technicianpatientsslot';
import Technicianregistration from './Technician/Technicianregistration';
import Techniciansendreports from './Technician/Techniciansendreports';
import Techniciannavbar from './Landpage/Techniciannavbar';
import AdminPatientHistory from './Admin/AdminPatientHistory';
import PatientHistory from './Patient/PatientHistory';
import PaymentDiagnostic from './Patient/PaymentDiagnostic';
import PaymentMedical from './Patient/PaymentMedical';
import DDashboard from './Doctor/DoctorDashboard1';
import DoctorProfile from './Doctor/DoctorProfile';

import TechnicianProfile from './Technician/TechnicianProfile';
import Techniciandashboard from './Technician/TechnicianDashboard';
import AmbulenceServices from './Patient/Ambulence';
import PaymentPage from './Patient/PaymentPage';
import ContactAdmin from './Doctor/ContactAdmin';
import AdminContact from './Admin/AdminContact';
import Appointments from './Patient/Appointments';
import Search from './Patient/Search';
import Technicianreportform from './Technician/TechnicianReportForm';
import AdminPatient from './adminpatient';
import TechnicianHistory from './Admin/TechnicianHistory';
import MedicalAppointment from './Patient/MedicalAppointment';
import DiagnosticAppointments from './Patient/DiagnosticAppointment';
import PatientForm from './Diagnostics';
import BooKTest from './BookTest';
import PaymentHistory from './Admin/PaymentHistory';
import MedicalSlots from './Technician/TechnicianMedical';
import SlotUpdate from './Patient/SlotUpdate';
import Pathology from './Patient/Pathology';
import Radiology from './Patient/Radiology';
import Dialysis from './Patient/Dialysis';
import Audiology from './Patient/Audiology';
import PaymentConsult from './Patient/Paymentconsult';


function App() {
  return (
   <>

    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Landpage/>}/>
        <Route path='/FooterPage' element={<FooterPage/>}/>
        <Route path='/LandNav' element={<LandNav/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>  
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/change' element={<Changepassword/>}/>    
        <Route path='/patientdashboard' element={<PatientDashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/patientnav' element={<PatientNav/>}/>
        <Route path='/appointments' element={<Appointments/>}/>
        <Route path='/search' element={<Search/>}/>



        <Route path='/online' element={<OnlineService/>}/>
        <Route path='/ambulance' element={<AmbulenceServices/>}/>
        <Route path='/diagnostic' element={<Diagnostic/>}/>
        <Route path='/medical' element={<MedicalServicesHome/>}/>
        <Route path='/medicalservice' element={<MedicalService/>}/>
        <Route path='/slotbooking' element={<TimeSlots/>}/>
        <Route path='/PaymentPage' element={<PaymentPage/>}/>
        <Route path='/Payment' element={<Payment/>}/>
        <Route path='/paymentdiagnostic' element={<PaymentDiagnostic/>}/>
        <Route path='/PaymentMedical' element={<PaymentMedical/>}/>


        <Route path='/pathology' element={<Pathology/>}/>
        <Route path='/radiology' element={<Radiology/>}/>
        <Route path='/dialysis' element={<Dialysis/>}/>
        <Route path='/audiology' element={<Audiology/>}/>


      
        <Route path='/doctorregister' element={<Doctorregistration/>}/>
        <Route path='/doctor' element={<Doctorlogin/>}/>
        <Route path='/patienthistory' element={<DoctorHistory/>}/>
        <Route path='/ddashboard' element={<DDashboard/>}/>
        <Route path='/dprofile' element={<DoctorProfile/>}/>



        <Route path='/admindoctor' element={<Doctorshistory/>}/>
        <Route path='/doctordashboard' element={<DoctorDashboard/>}/>
        <Route path='/delete' element={<deleteDataById/>}/>
        <Route path='/treat' element={<Treat/>}/>       
        <Route path='/slots' element={<Patientslots/>}/>
        <Route path='/contactadmin' element={<ContactAdmin/>}/>




        <Route path='/adminpatienthistory' element={<AdminPatientHistory/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/patientshistory' element={<PatientHistory/>}/>
        <Route path='/paymenthistory' element={<PaymentHistory/>}/>
        <Route path='/contact' element={<AdminContact/>}/>


        <Route path='/Technicianafterlogin' element={<Technicianafterlogin/>}/>
        <Route path='/Technicianlandpage' element={<Technicianlandpage/>}/>
        <Route path='/Technicianlogin' element={<Technicianlogin/>}/>
        <Route path='/Technicianpatientslot' element={<Technicianpatientslot/>}/>
        <Route path='/Technicianregistration' element={<Technicianregistration/>}/>
        <Route path='/Techniciansendreports' element={<Techniciansendreports/>}/>
        
        <Route path='/Techniciannavbar' element={<Techniciannavbar/>}/>
        <Route path='/technicianprofile' element={<TechnicianProfile/>}/>
        <Route path='/technicianDashboard' element={<Techniciandashboard/>}/>
        <Route path='/Technicianreportform' element={<Technicianreportform/>}/>
        <Route path='/medicalslots' element={<MedicalSlots/>}/>
   
     



      <Route path='/adminpatients' element={<AdminPatient/>}/>
      <Route path='/tech' element={<TechnicianHistory/>}/>

       
      <Route path='/medicalappointments' element={<MedicalAppointment/>}/>
      <Route path='/diagnosticappointment' element={<DiagnosticAppointments/>}/>
      <Route path='/form' element={<PatientForm/>}/>
      <Route path='/test' element={<BooKTest/>}/>
      <Route path='/slotupdate' element={<SlotUpdate/>}/>

      <Route path='/paymentconsult' element={<PaymentConsult/>}/>
     
      </Routes>
    </BrowserRouter>



   </>
  );
}


export default App;
