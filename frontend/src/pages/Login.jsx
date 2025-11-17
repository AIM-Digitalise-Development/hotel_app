import { useState} from 'react'
import axios from 'axios'
import "../styles/Login.css";
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()
 
    const handleSubmit = async(e) => {
      e.preventDefault()
      try{
         const response = await axios.post("https://hotel-app-kx38.onrender.com/api/auth/login",{email,password});
         if(response.data.success){
           login(response.data.user)
           localStorage.setItem("token" , response.data.token)
           if(response.data.user.role === "admin"){
               navigate('/admin-dashboard')
           }else{
            navigate("/employee-dashboard")
           }
         }
      }catch(error) {
         if(error.response && !error.response.data.success){
           setError(error.response.data.error)
         } else{
           setError("Server Error")
         }
      }
    }

  return (
    <div className="login-container">
      <h2 className="login-title">Employee Management System</h2>
      <div className="login-card">
        <h2 className="login-heading">Login</h2>
        {error && <p className="text-red-500">{error}</p> }
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-options">
            <label className="inline-flex items-center">
              <input type="checkbox" className="login-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="login-link">
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
