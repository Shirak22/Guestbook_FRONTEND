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


    function handleLogin(){
        usersData[0].forEach( user => {
            if(user.username === userName && user.password.toString() === password.toString()){
                dispatch(loggedIn(user.username));
                console.log('access success!'); 

                
            }else {
                return
            }
        }); 

        
    }
    return ( 
        <main>
            {
                currentUser === null ? (<>
                    <form >
                       <section className="formInput">
                           <label htmlFor="userName">Username: </label>
                           <input required id="userName" type="text" onChange={(e) => setUserName(e.target.value)} />
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