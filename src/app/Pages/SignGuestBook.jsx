
import InputForm from "../Components/InputForm";
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { loggedIn } from "../actions/guestbookactions";
import { Navigate, useNavigate } from "react-router";

function SignGuestBook() {
    const [signSuccess,setSignSuccess ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.postReducer.currentUser );
    
    useEffect(()=> {
        const option = {
            method:'GET',
            headers:{
                'Content-type': 'application/json',
            },
            credentials:'include',
          }; 
        fetch('http://localhost:3000/api/auth/checkuser',option)
        .then(res => res.json()).then(data => {
            if(data.success){
                dispatch(loggedIn(data.user));
            }else {
                dispatch(loggedIn(null));
                navigate('/login');
            }
        } ); 
    },[]);



    return (
        <main>
            {
                currentUser && <>
                    <p className="newEditEntry_title">New Entry</p>
                    <InputForm setMission={setSignSuccess} isNewEntry={true} />
                    {signSuccess ? <p className="warning__success"> added successfuly! </p> : ''}
                </>
            }

        </main>

    )
}

export default SignGuestBook;