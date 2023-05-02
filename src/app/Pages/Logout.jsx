import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../actions/guestbookactions";
import { useNavigate } from "react-router";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=> {
        dispatch(loggedIn(null))
        setTimeout(()=> navigate('/'),1500)
    },[]);

    return ( 
        <>
         <h1>You are logged out </h1>
         <button onClick={()=> navigate('/')}>Go to Home page</button>
        
        </>
     );
}

export default Logout;