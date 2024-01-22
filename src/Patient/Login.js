
import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { setPatientDetails } from "./Authstate";
import Navbar from "../Navbar";
import LandNav from "../Landpage/LandNav";
import FooterPage from "../Landpage/FooterPage";
const Login=()=>
{

    const navigate = useNavigate();
    const [patientName,setPatientName]=useState("");
    const [password,setPassword]=useState("");


    useEffect(()=>
    {
        if(patientName!== "" && password!== "")
        {
            fetch('http://localhost:8092/getall/patients')
            .then((response)=>response.json())
            .then((pdata)=>
            {
                const isLoginSuccess=checkLogin(pdata,patientName,password);
             
                        if (isLoginSuccess) {
                          alert("Loggedin Successfully");
                          navigate("/patientdashboard");
                        
                          const loggedIn = pdata.find(
                            (user) =>
                              user.patientName === patientName && user.password === password
                          );
                          console.log(loggedIn);
                          setPatientDetails(loggedIn);
                          
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
                }, [patientName, password]);
                function checkLogin( data, enteredName, enteredPassword) {
                  // Your logic to check if the entered email and password match the data from the API
                  // Example: (Replace with your actual logic)
                  return data.some(
                    (user) => user.patientName === enteredName && user.password === enteredPassword
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
             
              setPatientName(name);
              setPassword(password);
                    
      }
      
      
      
          return (
              <>
           
           <LandNav/>
                      <div className="container-fluid " style={{backgroundImage:`url(https://www.litmus-solutions.com/wp-content/uploads/2018/12/GettyImages-927897070.jpg)`,height:'600px'}}>
                      <h2 style={{textAlign:'center',paddingTop:'50px'}}>Login</h2>
                          <div className="row">
                              <div className="col-12">
                                  <form className="p-5">
                              
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="patientName" className="form-label text-primary fw-bold">Patient Name :</label>
                                          <input type="text" className="form-control" id="inputpatientName"    required/>
                                      </div>
                                      
                                      <div className="p-3" style={{ margin: 'auto',display: 'block',width:'300px'}}>
                                          <label for="password" className="form-label text-primary fw-bold">Password :</label>
                                          <input type="password" className="form-control" id="inputpassword" required />
                                      </div>
                        
                                      <div className="p-4 text-center">
                                          <p>Dont have an Account? <Link to='/register'>Register here</Link></p>
                                      </div>
                                      <div className="p-3 text-center">
                                          <p>forgot password? <Link to='/forgot'>click here</Link></p>
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

export default Login;