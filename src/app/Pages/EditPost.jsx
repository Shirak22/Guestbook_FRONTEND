import { useSelector } from "react-redux";
import InputForm from "../Components/InputForm";
import { useNavigate } from "react-router";
import { useState } from "react";



function EditPost() {
     const currentUser = useSelector(state => state.postReducer.currentUser);
     const [signSuccess,setSignSuccess ] = useState(false);
     const navigate = useNavigate();


     
     return ( 
          <main>
               {
                    !!currentUser ? 
                    (<>
                         <p className="newEditEntry_title">Edit Entry</p>
                         <InputForm setMission={setSignSuccess} isNewEntry={false}/>
                    </>) : (<>
                         <p>Please login to be able to edit! </p>
                         <button onClick={navigate('/login')}>Login</button>
                    </>)
               }
               
            {signSuccess ? <p className="warning__success"> updated successfuly! </p> : ''}
               
          </main>
     )
}

export default EditPost;