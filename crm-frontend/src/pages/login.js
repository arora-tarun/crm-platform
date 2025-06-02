import React from 'react';
import { FcGoogle } from 'react-icons/fc';

function Login({ setUser }) {
  const handleLogin = () => {
    window.location.href = 'https://crm-platform-s759.onrender.com'; // your login endpoint
  };

  return (
    <div 
      className="container d-flex flex-column justify-content-center align-items-center" 
      style={{ minHeight: '80vh' }}
    >
      <h2>Login to CRM</h2>
      <button 
        onClick={handleLogin} 
        className="btn btn-outline-primary mt-3 d-flex align-items-center"
      >
        <FcGoogle size={24} style={{ marginRight: '8px' }} />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
