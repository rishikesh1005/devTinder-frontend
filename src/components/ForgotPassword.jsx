import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constant";
import {useNavigate} from "react-router-dom"
import { getErrorMessage } from "../utils/errorHandler";

const ForgotPassword = () => {
    const [emailId , setEmailId] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error ,setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = async() => {
        try{
          setError("");
          setSuccess("");

          if(newPassword !== confirmPassword){
              setError("Passwords do not match");
              return;
          }

          await axios.patch( BASE_URL + "/profile/password",{
                  emailId,
                  newPassword,
                  confirmPassword,
              },
              {   withCredentials : true }
          )

          setSuccess("Password changed successfully!");

          setTimeout(() => {
              navigate("/login");
          }, 1500);
        }
        catch(err){
            setError(getErrorMessage(err));
        }
    }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center">
            Forgot Password
          </h2>

          <input
            className="input input-bordered"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <input
            type="password"
            className="input input-bordered"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            className="input input-bordered"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500">
              {success}
            </p>
          )}

          <button
            className="btn btn-primary"
            onClick={handlePasswordChange}
          >
            Change Password
          </button>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword