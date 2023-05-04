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
        navigate('/edit/' + data.id + '/' + data.title);
    }

    //Content proccessor component handels the line breaks and text effects 
    function ContentProcessor({text}) {
        return (
            <article className="post_card-content">
                {text.split('\n').map((newLine, i) => <p key={i}>{newLine}</p>)}
            </article>
            )
    }

    function DateBadge({data}) {
        let date = data.split('-');
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        return (
            <div className="date__badge">
                <p className="date_badge-day">{date[2]}</p>
                <p className="date_badge-month" >{month[parseInt(date[1] - 1)]}</p>
                <p className="date_badge-year">{date[0]}</p>
            </div>
        );
    }

   
    return (
        <article  className="post_card">
            <div className="post_card__header">
                <p className="post_card__header-author"><span>Author:</span> {data.author} </p>
                <p className="post_card__header-region"><span>From:</span>{data.region} </p>
            </div>
            <ContentProcessor text={data.content} />
            <DateBadge data ={data.postDate}/>
           
            {
                currentUser && currentUser.username === data.username || currentUser && currentUser.role === 'admin' ? (<>
                    <div className="post_card-nav">
                        <button onClick={deleteAction}>remove</button>
                        <button onClick={editAction}>edit</button>
                    </div>
                  
                </>)
                    : null
            }
        </article>

    );
}

export default PostCard;