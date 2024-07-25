//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:3001/register')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
      <h1>{message}</h1> {}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
