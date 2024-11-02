// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Logged in');
      navigate('/test');
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div
    className="flex flex-col h-screen w-screen items-center justify-center"
    style={{
      backgroundImage: `url('/type.jpeg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <h2 className="text-2xl font-bold mb-4">Log In</h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-6">
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
        className="text-blue-700 border border-slate-800 rounded-lg px-4 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border border-slate-800 rounded-lg px-4 py-2"
        required
      />
      <button 
        type="submit" 
        className="bg-red-300 hover:bg-red-400 rounded-lg px-4 py-2 text-white font-medium transition-colors"
        >
        Login
      </button>
    </form>
  </div>
);
}

export default Login;