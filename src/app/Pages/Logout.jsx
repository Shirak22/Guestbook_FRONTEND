import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../actions/guestbookactions";
import { useNavigate } from "react-router";
import { SERVER_HOST } from "../config";

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=> {
        dispatch(loggedIn(null)); 
        const option = {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            credentials:'include',
            body:''
          }; 
        fetch(`${SERVER_HOST}/api/auth/logout`,option)
        .then(res => res.json()).then(data => {
            if(data.success){
                dispatch(loggedIn(null));
                setTimeout(()=> navigate('/'),1500);
                
            }else {
            }
        } ); 
        
    },[]);

    return ( 
        <>
            <section className="logout_view">
                <h1>Logged out successfuly! </h1>
                <button onClick={() => navigate('/')}>Go to Home page</button>
            </section>
        </>
     );
}

export default Logout;