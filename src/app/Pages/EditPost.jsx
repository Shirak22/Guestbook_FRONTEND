import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import InputForm from "../Components/Form";
import { updatePost } from "../actions/guestbookactions";



function EditPost() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.postReducer);
    const [preEntry,setpreEntry] = useState({})
    const [editedEntry,setEditedEntry] = useState({})
    const [posted, setPosted] = useState(false);

    function filterInfo(){
      let currentPost = state.posts.filter(post =>  post.id.toString() === params.id);
      return currentPost; 
    }

    function handleSubmit(){
      setPosted(true);
      dispatch(updatePost(editedEntry));
      setTimeout(() => navigate('/'), 1000 ); 
  }

     useEffect(()=> {
        setpreEntry(filterInfo()); 
     },[state])


     return ( 
        <main>
          <h1>Edit Post</h1>
          <InputForm action={setEditedEntry}  user={preEntry}/>
          <button onClick={handleSubmit} className="formInput__submit" >Submit</button>
           { posted ? <p style={{color:"lightgreen"}}>Your sign has been updated successfully!</p> : ''}
        </main>

        

     );
}

export default EditPost;