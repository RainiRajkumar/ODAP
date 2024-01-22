
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { setDoctorDetails } from "../Patient/Authstate"
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
const Doctorlogin=()=>
{

    const navigate = useNavigate();
    const [doctorId,setDoctorId]=useState("");
    const [password,setPassword]=useState("");


    useEffect(()=>
    {
        if(doctorId!== "" && password!== "")
        {
            fetch('http://localhost:8092/doctor/getall')
            .then((response)=>response.json())
            .then((pdata)=>
            {
                const isLoginSuccess=checkLogin(pdata,doctorId,password);
             
                        if (isLoginSuccess) {
                          alert("Loggedin Successfully");
                          navigate("/doctordashboard");
                        
                          const loggedIn = pdata.find(
                            (user) =>
                              user.doctorId === doctorId && user.password === password
                          );
                          console.log(loggedIn);
                          setDoctorDetails(loggedIn);
                          
                        } else {
                          // Handle unsuccessful login
                          alert("Invalid username or password");
                          
                        }
                      })
                      .catch((error) => {
                        console.error("Error fetching data:", error);
                        // Handle error fetching data
                      });
                  }
                }, [doctorId, password]);
                function checkLogin( data, enteredid, enteredPassword) {
                  // Your logic to check if the entered email and password match the data from the API
                  // Example: (Replace with your actual logic)
                  return data.some(
                    (user) => user.doctorId === enteredid && user.password === enteredPassword
                  );
                }
      
        function Submit(){
      
              const name = document.getElementById("inputpatientName").value;
              const password = document.getElementById("inputpassword").value;
              
              if(name==='' && password===''){
                  alert("Invalid Credentials");
              }
              else if(name===''){
                  alert("patientname is a Required Field");
              }
              else if(password===''){
                  alert("Password is a Required Field")
              }
             
              setDoctorId(name);
              setPassword(password);
                    
      }
      
      
      
          return (
              <>
           
         <LandNav/>
                      <div className="container-fluid " style={{backgroundImage:`url(https://www.litmus-solutions.com/wp-content/uploads/2018/12/GettyImages-927897070.jpg)`,height:'600px'}}>
                      <h2 style={{textAlign:'center',paddingTop:'50px'}}>Doctor Login</h2>
                          <div className="row">
                              <div className="col-12">
                                  <form className="p-5">
                              
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="patientName" className="form-label text-primary fw-bold">Doctor ID:</label>
                                          <input type="text" className="form-control" id="inputpatientName"    required/>
                                      </div>
                                      
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="password" className="form-label text-primary fw-bold">Password :</label>
                                          <input type="password" className="form-control" id="inputpassword" required />
                                      </div>
                        
                                      <div className="p-3 text-center">
                                          <p>Dont have an Account? <Link to='/doctorregister'>Register here</Link></p>
                                      </div>
                                    
                                      <div className="text-center">
                                      <button type="button" className="btn btn-primary" onClick={Submit}>Submit</button>
                                      </div>
                                </form>
                              </div>
                          </div>
                      </div>
            <FooterPage/>
    </>
    )
}


export default Doctorlogin;