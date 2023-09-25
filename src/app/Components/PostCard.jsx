import { useDispatch,useSelector} from "react-redux";
import { removePost } from "../actions/guestbookactions";
import {  useNavigate } from "react-router";
import { SERVER_HOST } from "../config";

function PostCard({ data }) {
       const currentUser = useSelector(state => state.postReducer.currentUser )
       const navigate = useNavigate(); 
       const dispatch = useDispatch();
       let dateParse = new Date(data.createdAt);
       

    async    function deleteAction (){
         const option = {
             method: 'DELETE',
             headers:{
                 'Content-type': 'application/json',
             },
             credentials:'include',
             body :''
         }
         await fetch(`${SERVER_HOST}/api/delete/` + data.id,option);
        dispatch(removePost(data.id));

         
    }
    function editAction () {
        navigate('/edit/' + data.id);
    }

    //Content proccessor component handels the line breaks and text effects 
    function ContentProcessor({text}) {
        return (
            <article dir="auto" className="post_card-content">
                {text.split('\n').map((newLine, i) => <p key={i}>{newLine}</p>)}
            </article>
            )
    }

    function DateBadge() {
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        return (
            <div className="date__badge">
                <p className="date_badge-day">{dateParse.getDate()}</p>
                <p className="date_badge-month" >{month[parseInt(dateParse.getMonth())]}</p>
                <p className="date_badge-year">{dateParse.getFullYear()}</p>
            </div>
        );
    }

    function getPostTime(){
        const hour = dateParse.getHours() < 10 ?  `0${dateParse.getHours()}` : dateParse.getHours() ; 
        const minutes = dateParse.getMinutes() < 10 ?  `0${dateParse.getMinutes()}` : dateParse.getMinutes() ; 
        const seconds = dateParse.getSeconds() < 10 ?  `0${dateParse.getSeconds()}` : dateParse.getSeconds() ; 

        return `${hour}:${minutes}`
    }   
   
    return (
        <article  className="post_card">
            <div className="post_card__header">
                <p className="post_card__header-author"> {data.username} </p>
                <p className="post_card__header-region"><span></span> {data.country} </p>
                <p className="post_card__postTime">{getPostTime()}</p>
            </div>
            <ContentProcessor text={data.comment} />
            <DateBadge />
           
            {
                currentUser && currentUser.userId === data.userId || currentUser && currentUser.role === 'admin' ? (<>
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