import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import { Link } from 'react-router-dom';

function Home() {
    const posts = useSelector(state => state.postReducer.posts);
    const reversedPosts = [...posts].reverse();

    return (
        <main>
          <section className="entries__container">

        
            <Link to="/sign" >Sign Guestbook</Link>
            {
                posts && reversedPosts.map((post, index) =>
                (
                    <PostCard key={index} data={post} />
                )

                )
            }
              </section>
        </main>
           
    );
}

export default Home;