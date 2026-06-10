import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../utils/constant";
import {useNavigate} from "react-router-dom"

const ForgotPassword = () => {
    const [emailId , setEmailId] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [error ,setError] = useState("");

    const navigate = useNavigate();

    const handlePasswordChange = async() => {
        try{

            await axios.patch( BASE_URL + "/profile/password",{
                    emailId,
                    newPassword,
                    confirmPassword,
                },
                {   withCredentials : true }
            )

            alert("Password Change Successfully!!!")

            navigate("/login");
        }
        catch(err){
            setError(err?.response?.data);
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

          <p className="text-red-500">{error}</p>

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