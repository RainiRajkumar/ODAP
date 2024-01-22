


import React, { useState, useEffect } from 'react';
import { getAllData } from './getall';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

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
      const selected = data.find(item => item.id === selectedId);
      setSelectedData(selected);
    }
  }, [selectedId, data]);

  const handleSelectId = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      <h1>Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id} onClick={() => handleSelectId(item.id)} style={{backgroundColor:'red'}}>
            {item.patientName}
          </li>
        ))}
      </ul>

      {selectedData && (
        <div>
          <div className='col-md-6'>
            <label for='patientName'  text-primary fw-bold>Patient Name :</label> 
            <input type='text' className="form-control" id='inputPatientName' value={selectedData.patientName}  placeholder="enter patient name"  required/>
          </div>
          <div className='col-md-6'>
            <label for='email' >Email :</label>
            <input type='email' className="form-control" id='inputemail'value={selectedData.email} required/>
          </div>

          <div className='col-md-6'>
            <label for='date' >Booking Date :</label>
            <input type='date' className="form-control" id='inputdate'value={selectedData.bookingdate}  required/>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
