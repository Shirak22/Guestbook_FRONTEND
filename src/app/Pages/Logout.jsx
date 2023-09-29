import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn } from "../actions/guestbookactions";
import { useNavigate } from "react-router";
import { SERVER_HOST } from "../config";

function Logout() {
    const currentUser = useSelector(state =>  state.postReducer.currentUser);
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
    useEffect(()=> {
        localStorage.removeItem('user');
    },[currentUser])

    return ( 
        <>
            <section className="logout_view">
                <h1>Logged out successfuly! </h1>
            </section>
        </>
     );
}

export default Logout;