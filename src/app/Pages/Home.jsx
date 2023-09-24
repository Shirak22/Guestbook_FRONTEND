import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { fillStore } from "../actions/guestbookactions";
import Header from "../Components/Header";

function Home() {
    const posts = useSelector(state => state.postReducer.posts);
    const reversedPosts = [...posts].reverse();
    const dispatch = useDispatch();
     //fetch  form the Server and fill the Redux store
  useEffect(() => {
    const option = {
      method:'GET',
    }; 
    fetch('http://localhost:3000/api',option)
    .then(res => res.json())
    .then(data => dispatch(fillStore(data))); 
  },[]); 

    return (
          <section className="entries__container">

        
            <Link className="Sign__button" to="/sign" >Sign Guestbook</Link>
            {
                posts && reversedPosts.map((post, index) =>
                (
                    <PostCard key={index} data={post} />
                )

                )
            }
              </section>
           
    );
}

export default Home;