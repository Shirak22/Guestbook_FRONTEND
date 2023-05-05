import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import { Link } from 'react-router-dom';

function Home() {
    const posts = useSelector(state => state.postReducer.posts);
    const reversedPosts = [...posts].reverse();

    return (
        <main>
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
            <nav className="footer_nav">

                <ul className="list">
                    <li className="nav__login"><a>Guestbook in React Redux Sass © 2023 By Shirak Soghomonian </a></li>
                    <li className="nav__login"><a target="_blank" href="https://github.com/Shirak22/guestbook">Github</a></li>
                    <li className="nav__login"><a target="_blank" href="https://codepen.io/shirakserop">CodePen</a></li>
                </ul>
            </nav>
        </main>
           
    );
}

export default Home;