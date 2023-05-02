import { useState } from 'react';
import InputForm from '../Components/Form'
import {Link, useNavigate } from    'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signGuestbook } from "../actions/guestbookactions";

function SignGuestBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.postReducer.currentUser)
    const [newEntry,setNewEntry] = useState({}); 
    const [posted,setPosted] = useState(false); 

    function handleSubmit(){
        dispatch(signGuestbook(newEntry));
        setPosted(true);
        setTimeout(() => navigate('/'), 1000 ); 
    }
    return (
        <main>
            <h1>Sign GuestBook</h1>
            <Link to="/">Home</Link>
            <InputForm action={setNewEntry} user={currentUser}/>
            <button onClick={handleSubmit} className="formInput__submit" >Submit</button>
           { posted ? <p style={{color:"lightgreen"}}>Your sign has been added successfully!</p> : ''}
            
        </main>

    );
}

export default SignGuestBook;