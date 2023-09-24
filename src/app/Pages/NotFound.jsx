import { useEffect } from "react";
import { useNavigate } from "react-router";

function NotFound() {
    const navigate = useNavigate(); 
    useEffect(()=> {
        setTimeout(()=> navigate('/'),1500)
    },[]);
    return ( 
        <>
            <h1 className="logout_view">Not found 404</h1>
        
        </>
     );
}

export default NotFound;