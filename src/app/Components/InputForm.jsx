import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { signGuestbook, updatePost } from "../actions/guestbookactions";


function InputForm({isNewEntry, setMission}) {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.postReducer.currentUser) || '';
    const state = useSelector(state => state.postReducer.posts) || [];
    const [currentPost,setCurrentPost] = useState({});   
    const [content, setContent] = useState('');
    const [response, setResponse] = useState('');


    useEffect(()=> {
        //if EditPost set current post global variable to use in default values 
        if(!isNewEntry){
            let post = state && state.filter(post => params.id.toString() === post.id.toString())[0] || '';
            setCurrentPost(post);
            setContent(post.comment)
        }
    },[]);
    
   
    // navigate on timer 
    function navigateOnTimer(path,time){
        setTimeout(()=>{
            navigate(path.toString()); 
        },time*1000)
    }


    function handleClick(e){
       e.preventDefault();
       

        if(isNewEntry){
            let userInput = {
                comment:content,
            }
            const option = {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json',
                },
                credentials:'include',
                body : JSON.stringify(userInput)
            }
           
            fetch('http://localhost:3000/api/sign',option)
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setResponse(data.message);
                    setMission(true); //to trigger indicator to sign guestbook page  
                     navigateOnTimer('/',1)
                }else {
                    setMission(false); 
                    setResponse(data.validInput);
                }
            });

            
        }else if(!isNewEntry){
            let comment = {
               comment: content
            }
            const option = {
                method: 'PUT',
                headers:{
                    'Content-type': 'application/json',
                },
                credentials:'include',
                body : JSON.stringify(comment)
            }
            fetch('http://localhost:3000/api/update/' + currentPost.id,option).then(res => res.json())
            .then(data => {
                if(data.success){
                    setResponse(data.message);
                    setMission(true); //to trigger indicator to sign guestbook page  
                    navigateOnTimer('/',1)
                }else {
                    setMission(false); 
                    setResponse(data.message);
                }
            });
        }
        
        
    }
    return (
        <>

            <form className="signForm">
                <section className="formInput">
                    <label htmlFor="content" >Your Comment: </label>
                    <textarea defaultValue={currentPost.comment} required id="content" type="text" onChange={(e)=> setContent(e.target.value)} />
                    <p className="InfoBadge">length:20-1200 characters</p>
                </section>
                <button onClick={handleClick}>{isNewEntry ? 'Submit' : 'Apply changes'}</button>
                <p className="response_">{response}</p>
            
            </form>

        </>


    );
}

export default InputForm;