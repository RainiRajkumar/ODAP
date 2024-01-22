import React from 'react';
import 'bootstrap-icons/bootstrap-icons.svg';
import { Link } from 'react-router-dom';

function FooterPage() {
    return (
<>
        
<footer class="text-center text-lg-start" style={{backgroundColor: "#b39eb5"}}>

  <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom" >

    <div class="me-8 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    <div>
      <a href="" class="me-4 text-reset">
        <i class="bi bi-facebook" style={{color:'blue',fontSize: '2rem'}}></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="bi bi-twitter" style={{color:'rgb(29,161,242)',fontSize: '2rem'}}></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="bi bi-google" style={{color:'red',fontSize: '2rem'}}></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="bi bi-instagram"style={{color:'rgb(254,218,117)',fontSize: '2rem'}}></i>
      </a>
      <a href="" class="me-4 text-reset">
        <i class="bi bi-linkedin" style={{color:'rgb(0,119,181)',fontSize: '2rem'}}></i>
      </a>
      
    </div>
  
  </section>

  <section class="">
    <div class="container text-center text-md-start mt-5">
   
      <div class="row mt-3">
       
      <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
       
          <h6 class="text-uppercase fw-bold "style={{textAlign:'center'}}>
            Company name
          </h6>
          
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
     

        <div class="col-lg-3 col-md-6 mb-4 mb-md-0 ">
        
          <h6 class="text-uppercase fw-bold  " style={{paddingLeft:'40px'}}>
            Actions
          </h6>
          <ul class="list-unstyled">
          <li>
            <a href="#!" class="text-reset">Contact US</a>
          </li>
          <li>
            <Link to="/doctor">Doctor Login</Link>
          </li>
          <li>
            <a href="#!" class="text-reset">Book an Appointment</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Know US</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Hospitals & Directions</a>
          </li>
          </ul>
        </div>
      
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
   
          <h6 class="text-uppercase fw-bold " style={{paddingLeft:'40px'}}  >
            Blogs
          </h6>
          <ul class="list-unstyled" >
          <li>
            <a href="#!" class="text-reset">Online Services</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Diagnostics</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Medical Services</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Reschedule</a>
          </li>
          <li>
            <a href="#!" class="text-reset">Ambulance Services</a>
          </li>
          </ul>
        </div>
 
        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
         
          <h6 class="text-uppercase fw-bold" style={{paddingLeft:'20px'}}>Gallery</h6>
          <ul class="list-unstyled">
          <li>
            <a href="#!" class="text-reset">News </a>
          </li>
          <li>
            <a href="#!" class="text-reset">Events</a>
          </li>
         </ul>
        </div>
       
      </div>
     
    </div>
  </section>


<div className='container-fluid'>
  <div class="text-center p-4" style={{backgroundColor:'#A8A8A8'}}>
  © 2024 Company, Inc. All rights reserved.
    <a class="text-reset fw-bold" href="https://mdbootstrap.com/">anarghyacommunications.com</a>
    <a>+91-040-67932204</a>
  </div>
</div>
</footer>



</>

    );
}
export default FooterPage;