

export const signGuestbook = (post) => ({
    type: "SIGN_GUESTBOOK", 
    payload: post
})

export const removePost = (post) => ({
    type: "REMOVE_POST",                          
    payload: post
})

export const updatePost = (post) => ({
    type: "EDIT_POST", 
    payload: post
})




export const fillStore = (posts) => ({
    type: "FILL_STORE",
    payload:posts
})