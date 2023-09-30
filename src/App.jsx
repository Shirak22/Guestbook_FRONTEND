
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignGuestBook from './app/Pages/SignGuestBook' 
import NotFound from './app/Pages/NotFound' 
import Home from './app/Pages/Home' 
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fillStore, loggedIn, updateViewsCounter } from './app/actions/guestbookactions'
import EditPost from './app/Pages/EditPost'
import Header from './app/Components/Header'
import LogIn from './app/Pages/LogIn'
import Logout from './app/Pages/Logout'
import Register from './app/Pages/Register'
import { SERVER_HOST } from './app/config'


function App() {
   const [data,setData] = useState([]);
   const dispatch = useDispatch(); 

   //fetch  form the Server and fill the Redux store
  useEffect(() => {
    const option = {
      method:'GET',
    }; 
    fetch(`${SERVER_HOST}/api`,option)
    .then(res => res.json())
    .then(data => setData(data)); 
  },[]); 

  useEffect(()=> {
    if(data.length > 0 ){
       dispatch(fillStore(data)); 
    }
  },[data]); 

  useEffect(()=> {
    let LocalStorageUser = JSON.parse(decodeURIComponent(localStorage.getItem('user'))); 
    dispatch(loggedIn(LocalStorageUser)); 
     
},[]);

  //make session request when new session starts. by saving the last count in session storage
  useEffect(()=> {
    if(!sessionStorage.getItem('session')){
        const option = {
            method: 'GET',
        };
        fetch(`${SERVER_HOST}/api/session`, option)
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('session',data.views_counts);
                dispatch(updateViewsCounter(data.views_counts));
            });
    }else {
      dispatch(updateViewsCounter(parseInt(sessionStorage.getItem('session'))));
    }

},[]);
  return (
    <BrowserRouter>
      <main>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/sign' element={<SignGuestBook />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
