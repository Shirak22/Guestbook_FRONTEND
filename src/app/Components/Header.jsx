
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser )
    const posts = useSelector(state => state.postReducer.posts )
    
    return (
       
        
            <>  
            <nav>
                <ul>
                    <li><Link to="/">View Guestbook</Link></li>
                    <li>{currentUser === null ? <Link to="/login" >Login </Link> : <Link to="/logout" >{currentUser.fullName}{currentUser.role === 'admin' ? '  (ADMIN)' : ''} Logout </Link> }</li>
                </ul>
            </nav>
            
            <h3>Total Entries: {posts.length}</h3>
            </>
          
            

     );
}

export default Header;