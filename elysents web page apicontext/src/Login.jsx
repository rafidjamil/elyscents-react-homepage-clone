import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'
import { JSON_PLACEHOLDER } from './fetch';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
    
      navigate('/user'); 
    }

    
    const users = [
      { id: "123456789", password: "111", name: "Rafid Jamil", email: "rafidjamil@gmail.com" },
      { id: "987654321", password: "222", name: "Mister arun", email: "arunsir@gmail.com" }
    ];

    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // User validate karna
    const user = storedUsers.find(u => u.id === id && u.password === password);

    if (user) {
      // User ko login karna
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate('/'); // Login ke baad profile par bhejna
    } else {
      alert("Incorrect ID or password");
    }

    setId('');
    setPassword('');
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Login</h2>
        <p>Login to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ID</label>
            <input
              type="text"
              placeholder="Enter your ID"
              value={id}
              onChange={e => setId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Log in</button>
        </form>
      </div>



      
    </div>
  );
}

export default Login;