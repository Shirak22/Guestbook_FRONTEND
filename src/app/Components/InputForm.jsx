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
    const [author, setAuthor] = useState(currentUser.fullName); 
    const [region, setRegion] = useState(''); 
    const [content, setContent] = useState('');


    useEffect(()=> {
        //if EditPost set current post global variable to use in default values 
        if(!isNewEntry){
            let post = state && state.filter(post => params.id.toString() === post.id.toString())[0] || '';
            setCurrentPost(post);

            //initial value 
            setAuthor(post.author)
            setRegion(post.region)
            setContent(post.content)
        }
    },[]);
    
    function handleChange(e) {
        let value = e.target.value;
        switch (e.target.id) {
            case "author":
                setAuthor(value);
                break;
            case "region":
                setRegion(value);
                break;
            case "content":
                setContent(value);
                break;
            default: 
                return ;
        }
    }

    //checks the currentUser and render the defaultvalue of NameInput 
    function renderDefaultNameValue(){
        
        if(isNewEntry){
            if(currentUser !== null){
                return currentUser.fullName; 
            }else {
                return '' ; 
            }
        }else { //Edit Entry
            
            return currentPost.author; 
        }
    }

    //make sure that the name is disabled if the user is registerd 
    function nameIsDisabled(){
        if(isNewEntry && !!currentUser){
            return true;
        }else if(!isNewEntry){
            if(currentUser.username === currentPost.username ){
                return true; 
            }
            return false; 
        }
    }

    // navigate on timer 
    function navigateOnTimer(path,time){
        setTimeout(()=>{
            navigate(path.toString()); 
        },time*1000)
    }


    function handleClick(){
        let date = new Date();
        let name = isNewEntry && author !== '' ? currentPost.author || author :  author;
        let newEntry = {
            author:name ,
            region:region,
            postDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            content:content
        }

        if(isNewEntry){
            dispatch(signGuestbook(newEntry));
            setMission(true); //to trigger indicator to sign guestbook page  
            navigateOnTimer('/',1)
        }else if(!isNewEntry){
            //update the post with new values without the id. 
            dispatch(updatePost({id:currentPost.id, ...newEntry}));
            setMission(true); //to trigger indicator to editpost page  
            navigateOnTimer('/',1)
        }
        
        
    }
    return (
        <>

            <form >
                <section className="formInput">
                    <label htmlFor="author">Your name: </label>
                    <input disabled={nameIsDisabled()} defaultValue={renderDefaultNameValue()} required id="author" type="text" onChange={handleChange} />
                </section>
                <section className="formInput">
                    <label htmlFor="region">Where are you from ?  </label>
                    <input defaultValue={currentPost.region} required id="region" type="text" onChange={handleChange} />
                </section>
                <section className="formInput">
                    <label htmlFor="content">Content: </label>
                    <textarea defaultValue={currentPost.content} required id="content" type="text" onChange={handleChange} />
                </section>

            </form>

            <button onClick={handleClick}>{isNewEntry ? 'Submit' : 'Apply changes'}</button>

        </>


    );
}

export default InputForm;