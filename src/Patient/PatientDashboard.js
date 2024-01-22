
import '../App.css';


import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';
import FooterPage from '../Landpage/FooterPage';

const PatientDashboard=()=>
{
  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });
  
    return(
        <>


<nav class="navbar navbar-expand-lg" style={{backgroundColor:'purple'}}>
    <div className="container-fluid">
    <Link to="/"><a class="navbar-brand"><img src="https://tse4.mm.bing.net/th?id=OIP.FOOgadJTQepY-ICLMJkBJgAAAA&pid=Api&P=0&h=180" style={{height:'60px',width:'60px'}}/></a></Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <p style={{fontSize:'30px',textAlign:'center'}}>Online Doctor Appointment Portal</p>
        </li>
      </ul>


      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <p style={{fontSize:'20px'}}>{date.toLocaleDateString()}  {date.toLocaleTimeString()}</p>
        </li>
      </ul>
    
      
    </div>
    </div>
 </nav>
  

    <nav class="navbar navbar-expand-lg" style={{backgroundColor:'bisque'}}>
    <div className="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <Link to="/profile">Profile</Link>
        </li>
        <li class="nav-item ">
          <Link to="/">Logout</Link>
        </li>

      </ul>
    </div>
    </div>
  </nav>

    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="https://mobisoftinfotech.com/resources/wp-content/uploads/2018/07/Banner-1.png" style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
            <img src="https://www.semiosissoftware.com/wp-content/uploads/2020/02/Doctor-Appointment-System-1536x840.jpg" style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
        <div class="carousel-item">
            <img src="https://static.vecteezy.com/system/resources/previews/000/470/930/original/vector-online-medical-services-flat-design.jpg"  style={{height:'500px'}} class="d-block w-100" alt="..."/>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

    
      
      <div className="container-fluid">
        <div className="row p-3 ">          
          <div className="col-sm-3">
          <Link to="/online"><img className="landimage" src="doctorimage.jpg" alt=""></img></Link>
            <p>Consultation services</p>
          </div>
          <div className="col-sm-3">
            <Link to="/medical"><img className="landimage" src="therapy.jpg" alt=""></img></Link>
            <p>Medical Services</p>
          </div>
          <div className="col-sm-3"><Link to="/ambulance"><img className="landimage" src="ambulance.jpg" alt=""></img></Link>
            <p>Ambulance Services</p>
          </div>
          <div className="col-sm-3"><Link to="/diagnostic"><img className="landimage" src="diagnostic.jpg" alt=""></img></Link>
            <p>Diagnostic services</p>
          </div>
        </div>
      </div>
      

    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-sm-4">
          <h3 style={{textAlign:'center'}}>Diagnostic Tests</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>    
        </div>

        <div className="col-sm-4">
          <h3 style={{textAlign:'center'}}>Consultation sevices</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>        
        </div>
   

      
        <div className="col-sm-4">
          <h3 style={{textAlign:'center'}}>Medical sercives</h3>
          <ul class="list-unstyled">
            <li className="landli">Complete Blood Count (CBC) Rs.200/-</li>
            <li className="landli">Blood Chemistry Panel RS.250/-</li>
            <li className="landli">Liver Function Tests (LFTs) Rs.300/-</li>
            <li className="landli">Kidney Function Tests (KFTs) Rs.400/-</li>
            <li className="landli">X-rays Rs.500/-</li>
            <li className="landli">Computed Tomography (CT) Scan Rs.600/-</li>
            <li className="landli">Magnetic Resonance Imaging (MRI) Rs.600/-</li>
            <li className="landli">Ultrasound Rs.800/-</li>
            <li className="landli">Electrocardiogram Rs.500/- (ECG or EKG)</li>
            <li className="landli">Biopsy Rs.1000/-</li>
            <li className="landli">Endoscopy Rs.1500/-</li>
            <li className="landli">Genetic Tests Rs.2000/-</li>
            <li className="landli">Pulmonary Function Tests Rs.1500/-</li>
            <li className="landli">Urinalysis  Rs.1000/-</li>
            <li className="landli">Colonoscopy Rs.1200/- </li>
            <li className="landli">Lumbar Puncture (Spinal Tap) Rs.3000/-</li>
          </ul>          
        </div>
      </div>
      </div>
    <FooterPage/>
</>
    )
}

export default PatientDashboard;



