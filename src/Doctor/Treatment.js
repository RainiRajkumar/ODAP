import { useState,useEffect } from "react";
import axios from "axios";
import DoctorDashboard from "./DoctorDashboard";
import FooterPage from "../Landpage/FooterPage";
import { getAllData } from "./getall";


function Treatment()
{   
  const [searchName, setSearchName] = useState('');
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  //const [selectedData, setSelectedData] = useState(null);


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

  const filteredData = data.filter(item =>
    item.patientName.toLowerCase().includes(searchName.toLowerCase())
    
  );

  // useEffect(() => {
  //   if (selectedId && data.length > 0) {
  //     const selected = data.find(item => item.id === selectedId);
  //     setSelectedData(selected);
   
  //   }
  // }, [selectedId, data]);

  // const handleSelectId = (id) => {
  //   setSelectedId(id);
  // };

  const[patientName,setPatientName]=useState('');
  const[bookingdate,setBookingdate]=useState('');
  const[email,setEmail]=useState('');
  const[prescription,setPrescription]=useState('');
  const[suggestion,setSuggestion]=useState('');

 

    const submit = async () => {       
            
          
        const datapatient = {
           patientName,
           email,
           bookingdate,
           prescription,
           suggestion,     
      
            
        };
    

            
try {
  const response = await axios.post('http://localhost:8092/treatpatient' ,datapatient);
  
    setPatientName('');
    setEmail('');
    setBookingdate('');
    setPrescription('');
    setSuggestion('');
    alert(" Treatment report send successful... " );      
    console.log(response);
    

  }catch(error){
  
    console.log("error occured"+error);
  
  }
}


    return(
        <>
   <DoctorDashboard/>
 <input type="text" placeholder="Search by name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>

 <table class="table table-striped">
        <thead>
        <tr>
          <th>Date</th>         
          <th>Patient Email</th>
          <th>Patient Name</th> 
        </tr>
        </thead>
        <tbody>
        {filteredData.map(item => (      
       
        <>
            <tr>                         
              <td  key={item.id}>{item.bookingdate}</td>             
              <td  key={item.id}>{item.email}</td>
              <td  key={item.id}>{item.patientName}</td>               
            </tr>
            </>
         ) )
        }
        </tbody>
      </table>


<div className="container-fluid bg-body-tertiary p-5" style={{backgroundImage:`url(https://www.wallpapertip.com/wmimgs/99-998859_background-image-for-hospital.jpg)`}}>
       <h2 style={{textAlign:'center'}}>Treatment and Suggestion</h2>
        <div className="row">
        <div className="col-12">
          <div className="container pt-4">
            <form className="row g-3">
            
   
          <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Patient Name :</label> 
            <input type='text' className="form-control" id='inputPatientName' value={patientName} onChange={(e)=>setPatientName(e.target.value)} placeholder="enter patient name"  required/>
          </div>
          <div className='col-md-6'>
            <label for='email' >Email :</label>
            <input type='email' className="form-control" id='inputemail'value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>

          <div className='col-md-6'>
            <label for='date' >Booking Date :</label>
            <input type='date' className="form-control" id='inputdate'value={bookingdate} onChange={(e)=>setBookingdate(e.target.value)} required/>
          </div>
     
          <div className='col-md-6'>           
            <label for='file' >Prescription :</label>
            <input type='file' name='prescription' className="form-control" id='inputfile' value={prescription} onChange={(e)=>setPrescription(e.target.value)}/>
          </div>
          <div className='col-md-6'>
            <label for='suggestion' >Suggestions :</label>
            <input type='text' className="form-control" id='inputsuggestion' value={suggestion} onChange={(e)=>setSuggestion(e.target.value)} placeholder='enter suggestions '/>
          </div>
          <div className='text-center'>
              <button type="button" className="btn btn-primary" onClick={submit} >Send</button>
            </div> 
        </form>
        </div>
        </div>
        </div>
      
    </div>
    <FooterPage/>
        </>
    )
}

export default Treatment;