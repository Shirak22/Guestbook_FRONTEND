import { userDatabase } from "../GuestBookStore/authentication";

const authenticationReducer = (state = userDatabase, action ) => {
    switch(action.type){
        case "FETCH_USERS": 
            return {
                ...state,
                users: [action.payload]
            }

        default: 
            return state; 
    }

}

export default authenticationReducer; 