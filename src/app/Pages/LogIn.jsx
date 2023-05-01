import { useState } from "react";

function LogIn() {

    const [userName,setUserName] = useState(''); 
    const [password,setPassword] = useState('');



  
    return ( 
        <main>
             <form >
            <section className="formInput">
                <label htmlFor="userName">Your name: </label>
                <input  required id="userName" type="text" onChange={(e) => setUserName(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="password">Region: </label>
                <input  required id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </section>
            </form>
            <button >Login</button>
        </main>
     );
}

export default LogIn;