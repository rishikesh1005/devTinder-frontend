import {useState} from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { getErrorMessage } from "../utils/errorHandler";

const Login = () => {
  const [emailId , setEmailId] = useState('');
  const [password , setPassword] = useState('');
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [isLoggInForm , setIsLoggInForm] = useState(false)
  const [error , setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try{
      const res = await axios.post(
        BASE_URL+"/login" ,
        {
          emailId,
          password,
        },
        {withCredentials: true}
      )
      dispatch(addUser(res.data));
      return navigate('/');
    }
    catch(err){
      setError(getErrorMessage(err));
    }
  
  }

  const handleSignup = async() => {
    try{
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {withCredentials : true}
      )
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    }
    catch(err){
      setError(getErrorMessage(err));
    }
  }

  return (
      <div className="flex justify-center my-12">
        <div className="card bg-base-300 text-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title justify-center"> {isLoggInForm ? "LOGIN" : "Sign Up"}</h2>

            {!isLoggInForm && <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name :</legend>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                
                />  
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                
                />  
              </fieldset>
              </>
            } 
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID :</legend>
              <input 
                type="text" 
                className="input" 
                placeholder="" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
               
              />  
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password:</legend>
              <input 
                type="password" 
                className="input" 
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              
            </fieldset>
            <p className='text-red-400'>{error}</p>         
            <div className="card-actions justify-center">
              <button className="btn bg-primary" onClick={isLoggInForm ? handleLogin : handleSignup}>{isLoggInForm ? "Login" : "SignUp"}</button>
            </div>

            <p className='card-actions justify-center my-2 cursor-pointer' onClick={() => setIsLoggInForm(!isLoggInForm) }>{isLoggInForm ? "New User ? SignUp Here" : "Already User? Login Here"}</p>
            {isLoggInForm && (<p className="text-blue-500 cursor-pointer text-sm mt-2 text-center" onClick={() => navigate("/forgot-password")}>Forgot Password?</p>)}
          </div>
        </div>
      </div>  
  )
}

export default Login