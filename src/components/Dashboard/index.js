import React, { useEffect } from 'react';
import axios from 'axios';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const Dashboard = () => {
  useEffect(() => {
    axios.get(apiURL).then(res => console.log(res));
  }, []);
  
  return (
    <h1>Dashboard</h1>
  );
};

export default Dashboard;
