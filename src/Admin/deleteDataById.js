

const deleteDataById = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:9081/api/v1/${doctorId}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        alert(`Record with ID ${doctorId} deleted successfully`);
      } else {
        console.error(`Failed to delete record with ID ${doctorId}`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  };
  
  export default deleteDataById;