
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FooterPage from '../Landpage/FooterPage';
import { Link } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';
import jsPDF from 'jspdf';


const Treat = () => {


  var [date,setDate] = useState(new Date());
    
  useEffect(() => {
      var timer = setInterval(()=>setDate(new Date()), 1000 )
      return function cleanup() {
          clearInterval(timer)
      }  
  });
  
    
const handleNavigation = () => {
  // Clear localStorage
  localStorage.clear();
};


  
  var doctors = localStorage.getItem('loggedIn');

// Convert the string back to an object
var stored = JSON.parse(doctors);

// Access the particular item within the response object
var dname = stored.doctorName;



const getAllData = async () => {
    try {
      const response = await fetch(`http://localhost:9081/api/v1/get/${dname}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);


      const [file, setFile] = useState(null);
      const [doctorName,setDoctorName]=useState(dname);
      const [suggestion,setSuggestion]=useState('');
      const [testSuggestions,setTestSuggestions]=useState('');
  
  const [patientEmail, setPatientEmail] = useState('');
  const [patientName, setPatientName] = useState('');
  const [bookingDate,setBookingDate]=useState('');

  const handleFileChange = (e) => {
             setFile(e.target.files[0]);
       };
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllData();
        setData(allData);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);






  useEffect(() => {
    if (selectedId && data.length > 0) {
      const selected = data.find(item => item.doctorId === selectedId);
      setSelectedData(selected);
    }
  }, [selectedId, data]);

  const handleSelectId = (doctorId) => {
    setSelectedId(doctorId);
  };

  const handleSubmit = async (e) => {
            e.preventDefault();
    
            const formData = new FormData();
        formData.append('patientName', selectedData.patientName);       
        formData.append('bookingDate',selectedData.bookingDate);
        formData.append('patientEmail',selectedData. patientEmail);
        formData.append('doctorName',doctorName);
        formData.append('suggestion',suggestion);
        formData.append('testSuggestions',testSuggestions);
        formData.append('file', file);
            
    
        try {
         

                    await axios.post('http://localhost:8092/sentemail', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    alert("pdf sent successfully");
                    console.log('Prescription sent to email successfully');
                } catch (error) {
                    console.error('Error sending PDF email:', error);
                }


            try {
    
             const response=await axios.post('http://localhost:8092/upload', formData);
console.log(response);
                alert('treatement made successful');
                console.log('File uploaded successfully!');
            } catch (error) {
                console.error('Failed to upload file.', error);
            }
        };


        const handleReceipt = () => {
          const pdf = new jsPDF();
      pdf.text('Treatment Prescription', 80, 20);
      pdf.text(`Name of Patient: ${selectedData.patientName}`,20,40);
      pdf.text('Appointmet Details: ',20,50);
      pdf.text(`Name of Doctor: ${selectedData.doctorName}`,20,60);
      pdf.text(`BookingDate : ${selectedData.bookingDate}`,20,70);
      pdf.text(`Patient Email:${selectedData.patientEmail}`,20,80);
      pdf.text('Suggestions and Recommendations: '+suggestion,20,90);
      pdf.text('Test Suggestions: '+testSuggestions,20,100);
      pdf.save('Prescription.pdf');
      
      
      alert("Payment successful!");
        }

  return (
    <>
 <DoctorDashboard/>     
     

        <div class="container-fluid display-table">
        <div class="row display-table-row">
            <div class="col-md-2 col-sm-1 hidden-xs display-table-cell v-align box" id="navigation">
                <div class="logo">
                        <img src="https://tse4.mm.bing.net/th?id=OIP.XsFTO6Tr5I4mfdTm3qsmBQAAAA&pid=Api&P=0&h=180" alt="merkery_logo" style={{height:'200px',width:'950px'}} />
                </div>
                <div class="navi">
                <ul>
                <li ><Link to="/ddashboard"><i class="bi bi-house-fill" ></i>Home</Link></li>
                        <li ><Link to="/slots"><i class="bi bi-calendar2-fill"></i>Booked Appointments</Link></li>
                        <li class="active"><Link to="/treat"><i class="bi bi-prescription"></i>Treatment</Link></li>
                        <li ><Link to='/patienthistory'><i class="bi bi-calendar2"></i>Log/History</Link></li>
                        <li ><Link to='/contactadmin'><i class="bi bi-person-lines-fill"></i>Contact Admin</Link></li>
                        <li ><Link to='/' onClick={handleNavigation}><i class="bi bi-box-arrow-right"></i>Logout</Link></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-sm-11 display-table-cell v-align">
                <div class="row">
                    <header>
                        <div class="col-md-12">     

    <div>
      <h1>Patient Names</h1>
      
      <ul style={{backgroundColor:'lightblue'}}>
        {data.map(item => (
          <ol key={item.doctorId} onClick={() => handleSelectId(item.doctorId)}>
            {item.patientName}
          </ol>
        ))}
      </ul>

      

      {selectedData && (
        <div>
          {/* <h2>Selected Data</h2>
          <p>ID: {selectedData.doctorId}</p> */}
          

          <div className="container-fluid bg-body-tertiary p-3" style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/99-998859_background-image-for-hospital.jpg)`}}>
       <h2 style={{textAlign:'center'}}>Treatment </h2>
        <div className="row">
        <div className="col-12">
           <div className="container pt-4">
         
             <form className="row g-3">   

          <div className='col-md-6'>
             <label for='doctorName'  text-primary fw-bold>Doctor Name :</label> 
            <input type='text' className="form-control" id='inputdoctorName' value={dname} onChange={(e)=>setDoctorName(e.target.value)} placeholder="enter doctor name"  required/>
           </div>

 
          <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Patient Name :</label> 
            <input type='text' className="form-control" id='inputPatientName' value={selectedData.patientName}  placeholder="enter patient name"  required/>
          </div>
          <div className='col-md-6'>
            <label for='email' >Email :</label>
            <input type='email' className="form-control" id='inputemail'value={selectedData.patientEmail} required/>
          </div>

          <div className='col-md-6'>
            <label for='date' >Booking Date :</label>
            <input type='date' className="form-control" id='inputdate'value={selectedData.bookingDate}  required/>
          </div>
          
           <div className='col-md-6'>
             <label for='suggestion' >Suggestions And Recommendations:</label>
             <span className="rx-symbol">℞</span>
             <textarea className="form-control" rows={4} cols={50} id='inputsuggestion' value={suggestion} onChange={(e)=>setSuggestion(e.target.value)}></textarea>
           </div>

           <div className='col-md-6'>
             <label for='testsuggestion' >Test Suggestions :</label>
             <span className="rx-symbol">℞</span>
             <textarea className="form-control" rows={4} cols={50} id='inputtestsuggestions'  value={testSuggestions} onChange={(e)=>setTestSuggestions(e.target.value)}> <span className="rx-symbol">℞</span></textarea>
           </div>

     
           <div className='col-md-6'>           
             <label for='file' >Prescription :</label>
             <input type='file' accept=".pdf" name='file'  onChange={handleFileChange}/>
          </div>
          <div className='text-center'>
              <button type='button' className="btn btn-primary" onClick={handleReceipt}>Generate Pdf</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} >Send</button>
          </div> 
           </form>
        </div>
        </div>
        </div>
        </div>
        </div>
       
      )}
    </div>

    </div>
                    </header>
                </div>
                
            </div>
        </div>

    </div>





    <FooterPage/>
    </>
  );
};

export default Treat;
