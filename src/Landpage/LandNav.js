import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

function LandNav(){

  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }
  
  });
  
    return(
        <>


<nav class="navbar navbar-expand-lg" style={{backgroundColor:'royalblue'}}>
    <div className="container-fluid">
    <Link to="/"><a class="navbar-brand"><img src="https://tse4.mm.bing.net/th?id=OIP.FOOgadJTQepY-ICLMJkBJgAAAA&pid=Api&P=0&h=180" style={{height:'60px',width:'60px'}}/></a></Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item ">
          <p style={{fontSize:'30px',textAlign:'center',color:"white"}}>Online Doctor Appointment Portal</p>
        </li>
      </ul>


      <ul class="nav navbar-nav navbar-right">
        <li class="nav-item">
          <p style={{fontSize:'20px',color:"white"}}>{date.toLocaleDateString()}  {date.toLocaleTimeString()}</p>
        </li>
      </ul>
    
      
    </div>
    </div>
 </nav>
  



  <nav class="navbar navbar-expand-lg" style={{backgroundColor:'white'}}>
    <div className="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
    {/* <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li class="nav-item " style={{paddingRight:"30px"}}>
          <Link to="/login">Patient Login</Link>
        </li>
        
        
      
     
      </ul>

    </div> */}
    </div>
  </nav>


  




         </>
    )
}
export default LandNav;