import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const UserCard = ({user}) => {
  const {_id,firstName,lastName,photoUrl, age ,gender,about,skills} = user
  const dispatch = useDispatch()

  const handleSendRequest = async (status , userId) => {
    try{
        const res = await axios.post(
            BASE_URL+"/request/send/" + status + "/" + userId,
            {},
            {withCredentials: true}
        )
        dispatch(removeUserFromFeed(userId))
    }
    catch(err){
        console.log(err)
    }
  }

  return (
    <div className="card bg-base-300 w-80 shadow-sm">
        <figure>
            <img
            src={photoUrl}
            alt="Photo" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            {skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                    <span key={index} className="badge badge-secondary">
                        {skill}
                    </span>
                    ))}
                </div>
            )}
            <div className="card-actions justify-center">
                <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored" , _id)}>Ignore</button>
                <button className="btn btn-primary" onClick={()=> handleSendRequest("interested" , _id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard