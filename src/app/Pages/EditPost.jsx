import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import InputForm from "../Components/Form";



function EditPost() {
    const params = useParams();
    const state = useSelector(state => state.postReducer);
    const [preEntry,setpreEntry] = useState({})
    const [editedEntry,setEditedEntry] = useState({})


     useEffect(()=> {
      let currentPost = state.posts.filter(post =>  post.id.toString() === params.id);
        setpreEntry(...currentPost);
     },[state])
     return ( 
        <main>
          <h1>Edit Post</h1>
          <InputForm action={setEditedEntry} user={preEntry}/>
        </main>
        

     );
}

export default EditPost;