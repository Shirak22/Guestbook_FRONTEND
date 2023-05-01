import { useState } from 'react';
import InputForm from '../Components/Form'
import {Link } from    'react-router-dom'
import { useDispatch } from 'react-redux';
import { signGuestbook } from "../actions/guestbookactions";

function SignGuestBook() {
    const dispatch = useDispatch();
    const [newEntry,setNewEntry] = useState({}); 
    const [posted,setPosted] = useState(false); 

    const initial ={
        author: "",
        title: "",
        region: "",
        postDate: "",
        content: " "
    }

    function handleSubmit(){
        dispatch(signGuestbook(newEntry));
        setPosted(true); 
    }
    return (
        <main>
            <h1>Sign GuestBook</h1>
            <Link to="/" >Home</Link>
            <InputForm action={setNewEntry} initial={initial} />
            <button onClick={handleSubmit} className="formInput__submit" >Submit</button>
           { posted ? <p style={{color:"green"}}>Your sign has been added successfully!</p> : ''}
            
        </main>

    );
}

export default SignGuestBook;