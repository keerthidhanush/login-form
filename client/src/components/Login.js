import React, { useState } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const history = useHistory();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('/api/auth/login', { email, password });
  //     localStorage.setItem('token', res.data.token);
  //     history.push('/dashboard');
  //   } catch (err) {
  //     console.error(err.response.data);
  //   }
  // };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" >
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="http://localhost:3000/register" className="text-blue-500">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
