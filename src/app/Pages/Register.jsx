import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loggedIn } from "../actions/guestbookactions";
import { SERVER_HOST } from "../config";

function LogIn() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const [userName,setUserName] = useState(''); 
    const [email,setEmail] = useState(''); 
    const [password,setPassword] = useState('');
    const [country,setCountry] = useState('');
    const [response,setResponse] = useState(''); 
    const [isLogged, setIsLogged] = useState();


    function handleSubmit(e){
        e.preventDefault(); 
        let userInput = {
            username:userName,
            email:email,
            password:password,
            confirm_passowrd:password,
            country:country
        }
        const option = {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            credentials:'include',
            body : JSON.stringify(userInput)
        }
        fetch(`${SERVER_HOST}/api/auth/register`,option)
        .then(res => res.json()).then(data => {
                if(data.success){
                    setResponse(data.message);
                    dispatch(loggedIn(data.user));
                    navigate('/'); 
                }else {
                    setResponse(data.message);
                }
            
        }); 
    }
    return ( 
        <main>
            <section className="login_form">
                {

                    !isLogged ? (<>
                        <form className="login_form_fields">
                          <h1 className=" Login_title">Register</h1>

                            
                            <section className="username_form">
                                <label htmlFor="userName">Name: </label>
                                <input required id="userName" type="text" onChange={(e) => { setUserName(e.target.value); }} />
                            </section>
                            <section className="email_form">
                                <label htmlFor="email">Email: </label>
                                <input required id="email" type="text" onChange={(e) => { setEmail(e.target.value); }} />
                            </section>
                            <section className="password_form">
                                <label htmlFor="password">Password: </label>
                                <input required id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            </section>
                            <section className="country_form">
                                <label htmlFor="country">Country: </label>
                                <input required id="country" type="text" onChange={(e) => setCountry(e.target.value)} />
                            </section>
                            <button onClick={handleSubmit}>Submit</button>
                          
                        </form>
                        {
                                response ? <p className="register_response">{response} </p> : ''
                            }
                    </>)

                        : (<>

                            <h1>You are already logged! </h1>
                            <button onClick={() => navigate('/')}>Go to Home page</button>
                        </>)

                }

            </section>
        </main>
     );
}

export default LogIn;