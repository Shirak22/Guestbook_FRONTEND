const process = import.meta.env;
export const SERVER_HOST =process.VITE_GUESTBOOK_BACKEND_HOST; 

export const SITE_INFO = {
    site_title:process.VITE_GUESTBOOK_TITLE,
}


export const GUESTBOOK_SETTINGS = {
    numberOfEntriesPerPage: 10,
}