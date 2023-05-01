import { useDispatch } from "react-redux";
import { removePost } from "../actions/guestbookactions";

function PostCard({ data }) {
       const dispatch = useDispatch();

    function deleteAction(){
        dispatch(removePost(data));
    }

    return (
        <article  className="post_card">
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            <p>{data.content}</p>
            <h3>{data.postDate} </h3>
            <button onClick={deleteAction}>remove</button>

        </article>

    );
}

export default PostCard;