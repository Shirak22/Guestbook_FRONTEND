import { useSelector } from "react-redux";
import { useParams } from "react-router";



function EditPost() {
    const params = useParams(); 
    const state = useSelector(state => state.postReducer); 

    return ( 
        <>
        <h1>Edit Post</h1>
        {
            state.posts && state.posts.map((post,index) => (

              post.id && params.id == post.id ? <p key={index}>{post.author}</p> : 'no such post'

            ))
        }
       
        </>
     );
}

export default EditPost;