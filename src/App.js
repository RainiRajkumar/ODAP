
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Patient/Login';
import Register from './Patient/Register';
import PatientDashboard from './Patient/PatientDashboard';
import Profile from './Patient/Profile';
import Registration from './Doctor/Registration';
import Doctorlogin from './Doctor/Doctorlogin';
import DoctorDashboard from './Doctor/DoctorDashboard';
import Ambulence from './Patient/Ambulence';
import ForgotPassword from './Patient/ForgotPassword';
import Changepassword from './Patient/changepassword';
import deleteDataById from './Admin/deleteDataById';
import DoctorHistory from './Doctor/DoctorHistory';
import Doctorshistory from './Admin/Doctorshistory';
import MedicalHome from './Patient/MedicalHome';
import Treatment from './Doctor/Treatment';
import Technician from './Technician/Technician';
import MedicalService from './Patient/MedicalService';
import OnlineService from './Patient/OnlineService';
import Landpage from './Landpage/Landpage';
import LandNav from './Landpage/LandNav';
import FooterPage from './Landpage/FooterPage';
import Diagnostic from './Patient/Diagnostic';
import MyComponent from './Doctor/select';
function App() {
  return (
   <>

    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Landpage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>     
        <Route path='/patientdashboard' element={<PatientDashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/online' element={<OnlineService/>}/>
        <Route path='/ambulance' element={<Ambulence/>}/>
        <Route path='/FooterPage' element={<FooterPage/>}/>
        <Route path='/LandNav' element={<LandNav/>}/>     
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/change' element={<Changepassword/>}/> 
        <Route path='/doctorregister' element={<Registration/>}/>
        <Route path='/doctor' element={<Doctorlogin/>}/>
        <Route path='/patienthistory' element={<DoctorHistory/>}/>
        <Route path='/admindoctor' element={<Doctorshistory/>}/>
        <Route path='/doctordashboard' element={<DoctorDashboard/>}/>
        <Route path='/delete' element={<deleteDataById/>}/>
        <Route path='/diagnostic' element={<Diagnostic/>}/>
        <Route path='/treatment' element={<Treatment/>}/>
        <Route path='/medical' element={<MedicalHome/>}/>
        <Route path='/technician' element={<Technician/>}/>
        <Route path='/medicalservice' element={<MedicalService/>}/>


        <Route path='/select' element={<MyComponent/>}/>
      </Routes>
    </BrowserRouter>



   </>
  );
}


export default App;
