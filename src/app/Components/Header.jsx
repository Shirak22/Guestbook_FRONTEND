
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser )

    return (
       
        <nav>
            {
                currentUser === null ? <Link to="/login" >Login </Link> : <Link to="/logout" >{currentUser.fullName}{
                    currentUser.role === 'admin' ? '(ADMIN)' : ''


                } Logout </Link>
            }
            <h3>Header</h3>
        </nav>
     );
}

export default Header;