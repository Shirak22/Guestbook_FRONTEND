import { useDispatch,useSelector} from "react-redux";
import { removePost } from "../actions/guestbookactions";
import {  useNavigate } from "react-router";

function PostCard({ data }) {
       const currentUser = useSelector(state => state.postReducer.currentUser )
    const navigate = useNavigate(); 
       const dispatch = useDispatch();

    function deleteAction(){
        dispatch(removePost(data));
    }
    function editAction () {
        console.log('Edit',data.id);
        navigate('/Edit/' + data.id);
    }

    return (
        <article  className="post_card">
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            <p>{data.content}</p>
            <h3>{data.postDate} </h3>
           
            {
                currentUser === data.author ? (<>
                    <button onClick={deleteAction}>remove</button>
                    <button onClick={editAction}>edit</button>
                </>)
                    : null
            }
        </article>

    );
}

export default PostCard;