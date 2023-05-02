import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loggedIn } from "../actions/guestbookactions";
function LogIn() {
    const usersData = useSelector(state => state.authReducer.users)
    const currentUser = useSelector(state => state.postReducer.currentUser)
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const [userName,setUserName] = useState(''); 
    const [password,setPassword] = useState('');
    const [accessDenied,setAccessDenied] = useState(false); 


    function handleLogin(){
        usersData[0].forEach( user => {
            if(user.username === userName && user.password.toString() === password.toString()){
                let currentUserInfo = {
                    userID: user.userID,
                    fullName:user.fullName,
                    role: user.role,
                    username: user.username,
                }
                dispatch(loggedIn(currentUserInfo));
                setTimeout(()=> navigate('/'),1000)

                
            }else {
                setAccessDenied(true);
                
            }
        }); 

        
    }
    return ( 
        <main>
            {
                currentUser === null ? (<>
                    <form >
                       {
                        accessDenied ? <p style={{color:'red'}}>Access Denied! ...... </p> : ''
                       }
                       <section className="formInput">
                           <label htmlFor="userName">Username: </label>
                           <input required id="userName" type="text" onChange={(e) => {setUserName(e.target.value); setAccessDenied(false) }} />
                       </section>
                       <section className="formInput">
                           <label htmlFor="password">Password: </label>
                           <input required id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                       </section>
                   </form>
                   <button onClick={handleLogin}>Login</button>
                   </>) 

                : (<>
                        
                        <h1>You are logged in </h1>
                        <button onClick={()=> navigate('/')}>Go to Home page</button>

                
                </>)
            }
           
           
        </main>
     );
}

export default LogIn;