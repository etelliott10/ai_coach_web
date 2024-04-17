import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/data');
        console.log('Response from API:', response.data); // Log the response data
        setMessage(response.data.message); // Set message from response data
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data from FastAPI:</h1>
      <p>{message}</p>
    </div>
  );
};

export default MyComponent;
