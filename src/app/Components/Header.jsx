
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser )
    const posts = useSelector(state => state.postReducer.posts )
    

    //returns last 5 elements in array: 
    const lastEntries = posts && posts.slice(Math.max(posts.length - 5, 1)); 

    //limiting the renderd text
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
                <p className='nav__login'>{currentUser === null ? <Link to="/login" >Login </Link> : <Link to="/logout" >{currentUser.fullName}{currentUser.role === 'admin' ? <span className='login_badge'>Admin</span> : ''}</Link>}</p>
            </nav>
            <section className='nav_guestbook__info'>
                <p>Number of Entries: {posts.length}</p>
                <p>Number of pages: {posts.length}</p>
                <div style={currentUser === null ? {backgroundColor:'#BC2525'} : {backgroundColor: '#25BCB6'}} className='login_indicator'></div>
            </section>
            <section className='nav_lastPosts_scrolling'>
                <p className='lastPosts__title'>last 5 entries</p>
                <section className='scrolling__posts'>
                    <section className='scrolling__posts-content'>
                        {
                            lastEntries ? lastEntries.reverse().map((post,index) => (
                                
                                <p> {index + 1}-{limitText(post.content,50) } ... <span style={{color:'red'}}>{post.author}</span></p>
                            )) : (<p>No entries...</p>)
                        }
                       
                    </section>
                
                </section>
            </section>
            
            </>
          
            

     );
}

export default Header;