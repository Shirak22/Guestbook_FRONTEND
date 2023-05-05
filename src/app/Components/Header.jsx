
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser )
    const posts = useSelector(state => state.postReducer.posts )
    
    return (
       
        
            <>  
            <nav>
                <h1 className='Logo'>GuestBook</h1>
                <p className='nav__login'>{currentUser === null ? <Link to="/login" >Login </Link> : <Link to="/logout" >{currentUser.fullName}{currentUser.role === 'admin' ? <span className='login_badge'>Admin</span> : ''}</Link>}</p>
            </nav>
            <section className='nav_guestbook__info'>
                <p>Number of Entries: {posts.length}</p>
                <p>Number of pages: {posts.length}</p>
                <div style={currentUser === null ? {backgroundColor:'#BC2525'} : {backgroundColor: '#25BCB6'}} className='login_indicator'></div>
            </section>
            <section className='nav_lastPosts_scrolling'>
                <p className='lastPosts__title'>last 10 entries</p>
                <section className='scrolling__posts'>
                    <section className='scrolling__posts-content'>
                        <p>Majdsafhjkl jkhsjdfjkh sjkdd </p>
                        <p>Majdsafhjkl jkhsjdfjkh sjkdd </p>
                        <p>Majdsafhjkl jkhsjdfjkh sjkdd </p>
                        <p>Majdsafhjkl jkhsjdfjkh sjkdd </p>
                        <p>Majdsafhjkl jkhsjdfjkh sjkdd </p>
                    </section>
                
                </section>
            </section>
            
            </>
          
            

     );
}

export default Header;