import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loggedIn } from "../actions/guestbookactions";
import { SERVER_HOST } from "../config";

function LogIn() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const [userName,setUserName] = useState(''); 
    const [password,setPassword] = useState('');
    const [accessDenied,setAccessDenied] = useState(false); 
    const [isLogged, setIsLogged] = useState();
    const [response,setResponse] = useState(''); 


    useEffect(()=> {
        const option = {
            method:'GET',
            headers:{
                'Content-type': 'application/json',
            },
            credentials:'include',
          }; 
        fetch(`${SERVER_HOST}/api/auth/checkuser`,option)
        .then(res => res.json()).then(data => {
            if(data.success){
                setIsLogged(true);
                dispatch(loggedIn(data.user));
                if(localStorage.getItem('user') === null ){
                    localStorage.setItem('user',encodeURIComponent(JSON.stringify(data.user))); 
                }
                navigate('/');
            }else {
                setIsLogged(false);
            }
        } ); 
    },[]);
    
    function handleLogin(e){
        e.preventDefault(); 
        let userInput = {
            email:userName,
            password:password,
        }
        const option = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            credentials:'include',
            body : JSON.stringify(userInput)
        }
        fetch(`${SERVER_HOST}/api/auth/login`,option)
        .then(res => res.json()).then(data => {
                if(data.success){
                    setIsLogged(true); 
                    localStorage.setItem('user',encodeURIComponent(JSON.stringify(data.message))); 
                    dispatch(loggedIn(data.message));
                    setResponse(data.message);
                    navigate('/'); 
                }else {
                    setResponse(data.message);
                    setIsLogged(false); 

                }
            
        }); 
    }
    return ( 
        <main>
            <section className="login_form">
                {

                    !isLogged ? (<>
                    

                        <form className="login_form_fields">
                          <h1 className=" Login_title">Login</h1>
                            {
                                accessDenied ? <p style={{ color: 'red' }}>Access Denied! ... </p> : ''
                            }
                            <section className="username_form">
                                <label htmlFor="userName">Email: </label>
                                <input required id="userName" type="text" onChange={(e) => { setUserName(e.target.value); setAccessDenied(false) }} />
                            </section>
                            <section className="password_form">
                                <label htmlFor="password">Password: </label>
                                <input required id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </section>
                            <button onClick={handleLogin}>Login</button>
                            <div className="auth_info_Link"><p >No Guestbook account </p><Link to="/register"><p> Register</p></Link></div> 
                        </form>
                    </>)

                        : (<>

                            <h1> </h1>
                            <button onClick={() => navigate('/')}>Go to Home page</button>
                        </>)

                }
                            {
                                response ? <p className="register_response">{response} </p> : ''
                            }
            </section>
        </main>
     );
}

export default LogIn;