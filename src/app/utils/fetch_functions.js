
export const fetchGet = async (URL) => {
    const option = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    };
   const res = await  fetch(URL, option);
   const data = res.json();

   return data; 
} 