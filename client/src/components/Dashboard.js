import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('../models/User', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`../models/User/${editingUser._id}`, { name, email, password }, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
      } else {
        await axios.post('../models/User', { name, email, password }, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });
      }
      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`../models/User/${id}`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      fetchUsers();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setEditingUser(user);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setEditingUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // history.push('/login'); Uncomment if using react-router-dom v5 or below
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Dashboard</h1>
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
      <form onSubmit={handleCreateOrUpdate} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          className="block w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {editingUser ? 'Update User' : 'Create User'}
        </button>
      </form>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Email</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-4 border">{user.name}</td>
              <td className="p-4 border">{user.email}</td>
              <td className="p-4 border">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 bg-yellow-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
