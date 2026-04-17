import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector((store) => store.feed)

  const getFeed = async() => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL+"/feed" , {withCredentials:true});
      dispatch(addFeed(res?.data?.data))
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getFeed();
  } , []);

  if(!feed) return;

  if(feed.length <= 0){
    return(
      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="text-3xl font-bold my-8 justify-center">No New User Present</h1>
      </div>
    )
  }

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]}/>
      </div>
    )
  )
}

export default Feed