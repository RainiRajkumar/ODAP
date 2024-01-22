

const deleteDataById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8092/delete/${id}`, {
        method: 'DELETE',
        
      });
  
      if (response.ok) {
        alert(`Record with ID ${id} deleted successfully`);
      } else {
        console.error(`Failed to delete record with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      throw error;
    }
  };
  
  export default deleteDataById;