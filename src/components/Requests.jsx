import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../utils/errorHandler";

const Requests = () => {
    const requests = useSelector((store) => store.requests)
    const dispatch = useDispatch()
    const [error, setError] = useState("");

    const reviewRequest = async ( status, _id ) => {
        try{
            const res = await axios.post(
                BASE_URL+"/request/review/" + status + "/" + _id,
                {},
                {withCredentials: true}
            )
            dispatch(removeRequest(_id))
        }
        catch(err){
            setError(getErrorMessage(err));
        }
    }


    const fetchRequests = async() => {
        try{
            const res = await axios(BASE_URL+"/user/requests/received",
                {withCredentials: true}
            )

            dispatch(addRequests(res?.data?.data))
        }
        catch(err){
            setError(getErrorMessage(err));
        }
    }

    useEffect(()=>{
        fetchRequests();
    } , [])


    if(!requests) return;

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center my-8">
                <h1 className="text-red-500 text-xl">
                    {error}
                </h1>
            </div>
        );
    }


    if(requests.length === 0){
        return(
            <div className="flex flex-col justify-center items-center my-8">
               <h1 className="text-3xl font-bold my-8 justify-center">No Request Present</h1>
            </div>
        )
    }
    return (
        <div className="flex flex-col justify-center items-center my-8">
            <h1 className="text-3xl font-bold my-8">Requests</h1>
            {requests.map((request) => {
                const {_id , firstName , lastName , age, about , photoUrl , gender} = request.fromUserId
                return (
                    <div key={_id} className="flex justify-between items-center flex-row w-2/3 bg-base-300 shadow-sm m-2 p-4 mx-auto">
                        <div className="w-20 h-20">
                        <img 
                            className="w-full h-full rounded-full"
                            src={photoUrl}
                            alt="photo" 
                        />
                        </div>
                        <div className="card-body w-3/5">
                            <h2 className="card-title">{firstName + " " + lastName}</h2>
                            {age && <span>{age + " "}</span>}
                            {gender && <span>{gender}</span>}
                            <p>{about}</p> 
                        </div>
                        <div className="flex flex-row">
                            <button 
                               className="btn btn-primary mx-2"
                               onClick={() => reviewRequest("accepted" , request._id)}
                            >
                                Accept
                            </button>
                            <button 
                                className="btn btn-secondary mx-2" 
                                onClick={() => reviewRequest("rejected" , request._id)}
                            >   
                                Reject
                            </button>

                        </div>
                    </div> 
                )
            })}
        </div>
    )
}

export default Requests