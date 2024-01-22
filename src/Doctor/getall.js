
import { getDoctorDetails } from "../Patient/Authstate";
const getAllData = async () => {
    const doctor = getDoctorDetails();
    try {
      const response = await fetch(`http://localhost:8092/byname/${doctor.doctorFirstname}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export { getAllData };