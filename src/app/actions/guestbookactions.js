

export const signGuestbook = (post) => ({
    type: "SIGN_GUESTBOOK", 
    payload: post
})

export const removePost = (post) => ({
    type: "REMOVE_POST",                          
    payload: post
})

export const updatePost = (post) => ({
    type: "UPDATE_POST", 
    payload: post
})

export const loggedIn = (username) => ({
    type: "LOGGED_IN",
    payload:username

})

export const totalEntries = (entriesCount) => ({
    type: "TOTAL_ENTRIES",                          
    payload: entriesCount
})

export const totalPages = (pagesCount) => ({
    type: "TOTAL_PAGES",                          
    payload: pagesCount
})


export const fillStore = (posts) => ({
    type: "FILL_STORE",
    payload:posts
})

export const updateViewsCounter = (viewsCount) => ({
    type:"UPDATE_VIEWS_COUNTER",
    payload:viewsCount
})

export const fillLastEntries = (entriesCount) => ({
    type: "FILL_LAST_ENTRIES",                          
    payload: entriesCount
})
