
import { useState } from "react";
import InputForm from "../Components/InputForm";


function SignGuestBook() {
    const [signSuccess,setSignSuccess ] = useState(false);


    return (
        <main>
            <p>New Entry</p>
            <InputForm setMission={setSignSuccess} isNewEntry={true}/>
            {signSuccess ? <p className="warning__success"> added successfuly! </p> : ''}
        </main>

    )
}

export default SignGuestBook;