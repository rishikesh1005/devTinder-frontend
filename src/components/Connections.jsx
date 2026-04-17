import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections) 
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL +"/user/connections" , 
                {withCredentials:true},
            )
            dispatch(addConnections(res?.data?.data))
        }
        catch(err){
            console.log(err)
        }
    };
    
    useEffect(()=>{
        fetchConnections();
    } ,[]);

    if(!connections) return;

    if(connections.length === 0){
       return(
            <div className="flex flex-col justify-center items-center my-8">
               <h1 className="text-3xl font-bold my-8 justify-center">No Connection Found</h1>
            </div>
        )
    }


    return (
        <div className="flex flex-col justify-center items-center my-8">
            <h1 className="text-3xl font-bold my-8">Connections</h1>
            {connections.map((connection) => {
                const {_id ,firstName , lastName , age, about , photoUrl , gender} = connection
                return (
                    <div key={_id} className="flex justify-between items-center flex-row w-2/3 bg-base-300 shadow-sm m-2 p-4 mx-auto">
                    
                        <img 
                            className="w-20 h-20 rounded-full"
                            src={photoUrl}
                            alt="photo" 
                        />
                        <div className="card-body">
                            <h2 className="card-title">{firstName + " " + lastName}</h2>
                            {age && <span>{age + " "}</span>}
                            {gender && <span>{gender}</span>}
                            <p>{about}</p> 
                        </div>
                    </div> 
                )
            })}
        </div>
    )
}

export default Connections