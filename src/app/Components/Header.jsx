
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser ); 
    const posts = useSelector(state => state.postReducer.posts );
    

    //returns last 5 elements in array: 
    const lastEntries = posts && posts.slice(Math.max(posts.length - 5, 0)); 

   // limiting the renderd text
    function limitText(text,limit){
        if(text.length > limit ){
            return text.slice(0,limit).toString(); 
        }else {
            return text;
        }
    }
    return (
       
        
            <>  
            <nav>
               <Link to='/'><h1 className='Logo'>GuestBook</h1></Link> 
                <p className='nav__login'>{currentUser === null ? (<><Link to="/register" >Register </Link> <Link to="/login" >Login </Link> </>)  : <Link to="/logout" >{currentUser.username + (' (Logout)')}{currentUser.role === 'admin' ? <span className='login_badge'>Admin</span> : ''}</Link>}</p>
            </nav>
            <section className='nav_guestbook__info '>
                <p className='InfoBadge'><span>{posts.length}</span> Entries </p>
                <p className='InfoBadge'><span>{posts.length}</span>Pages</p>
                <div style={currentUser === null ? {backgroundColor:'#BC2525'} : {backgroundColor: '#25BCB6'}} className='login_indicator'></div>
            </section>
            <section className='nav_lastPosts_scrolling'>
                <p className=' lastPosts__title '>last<span> 5 </span>entries</p>
                <section className='scrolling__posts'>
                    <section className='scrolling__posts-content'>

                        {
                            lastEntries.length !== 0 ? lastEntries.reverse().map((post,index) => 
                                
                                <p key={index}> 📝 {limitText(post.comment,40) }.. ◄ <span className='scroll_author'>{post.username}</span></p>
                            ) : <p>No entries... </p>
                        }
                       
                    </section>
                
                </section>
            </section>
            
            </>
          
            

     );
}

export default Header;