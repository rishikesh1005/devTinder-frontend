import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import {addUser} from "../utils/userSlice"
import { getErrorMessage } from "../utils/errorHandler"

const EditProfile = ({user}) => {
    const [firstName ,setFirstName] = useState(user.firstName)
    const [lastName ,setLastName] = useState(user.lastName)
    const [photoUrl ,setPhotoUrl] = useState(user.photoUrl)
    const [age ,setAge] = useState(user.age || "")
    const [gender ,setGender] = useState(user.gender || "")
    const [about ,setAbout] = useState(user.about || "")
    const [error ,setError] = useState("")
    const [showToast , setShowToast] = useState(false)

    const [skills, setSkills] = useState(user.skills ? user.skills.join(", ") : "");
    
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("")
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit" ,
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                    skills: skills
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean),
                },
                {withCredentials : true }
            )
            console.log(res);
            dispatch(addUser(res?.data?.data));
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false);
            },2000)
        } 
        catch(err){
            setError(getErrorMessage(err));
        }
    }


    return (
        <div className="flex justify-center my-28">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-300 text-primary-content w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name:</legend>
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

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">PhotoUrl:</legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="" 
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    
                    />
                    </fieldset>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Age:</legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    
                    />
                    </fieldset>

                    <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender:</legend>
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="" 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    
                    />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About:</legend>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="" 
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        
                        />
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Skills:</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="React, Node.js, MongoDB"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                        />
                    </fieldset>

                    
                    <p className='text-red-400'>{error}</p>         
                    <div className="card-actions justify-center">
                        <button className="btn bg-primary" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
                </div>
            </div> 
            <UserCard user={{firstName,lastName,photoUrl,age,gender,about,skills: skills.split(",").map((s) => s.trim()).filter(Boolean)}}/>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </div> 
    )
}

export default EditProfile