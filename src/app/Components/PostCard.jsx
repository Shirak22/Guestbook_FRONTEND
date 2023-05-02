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
        console.log('edit',data.id);
        navigate('/edit/' + data.id);
    }


    function contentProcessor(text) {
        return text.split('\n').map((newLine,i) => <p key={i}>{newLine}</p>)
    }

    return (
        <article  className="post_card">
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            {contentProcessor(data.content)}
            <h3>{data.postDate} </h3>
           
            {
                currentUser && currentUser.username === data.username || currentUser && currentUser.role === 'admin' ? (<>
                    <button onClick={deleteAction}>remove</button>
                    <button onClick={editAction}>edit</button>
                </>)
                    : null
            }
        </article>

    );
}

export default PostCard;