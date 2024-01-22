import React from "react";
import './Landpage.css'
import FooterPage from "./FooterPage";
import LandNav from "./LandNav";
import { Link } from "react-router-dom";



export default function Landpage() {
  return (
    <>
    

    <LandNav/>

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
          
          <div className="col-md-3"><Link to="/login"><img className="landimage" src="doctorimage.jpg" alt=""></img></Link>
            <p>Consultation services</p>
          </div>

          <div className="col-md-3"><Link to="/login"><img className="landimage" src="therapy.jpg" alt=""></img></Link>
            <p>Medical Services</p>
          </div>

          <div className="col-md-3"><Link to="/login"><img className="landimage" src="ambulance.jpg" alt=""></img></Link>
            <p>Ambulance Services</p>
          </div>
          <div className="col-md-3"><Link to="/login"><img className="landimage" src="diagnostic.jpg" alt=""></img></Link>
            <p>Diagnostic services</p>
          </div>
        </div>
      </div>
      

    <div className="container-fluid">
      <div className="row p-5">
        <div className="col-md-4">
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

        <div className="col-md-4">
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
   

      
        <div className="col-md-4">
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
    
      <FooterPage></FooterPage>
    </>
  );
}