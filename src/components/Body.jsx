import NavBar from "./NavBar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    if(userData) return;
    try{                             //to avoid logout of user if cookies are not expired
      const res = await axios.get( 
        BASE_URL + "/profile/view", 
        {withCredentials:true}
      )
      dispatch(addUser(res.data))
    }
    catch(err){
      if(err?.response?.status === 401){
        navigate("/login")
      }
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchUser();
  } ,[])

  return (
    <>
       <NavBar />
       <Outlet />
       <Footer />
    </>
  )
}

export default Body