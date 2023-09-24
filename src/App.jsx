
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignGuestBook from './app/Pages/SignGuestBook' 
import NotFound from './app/Pages/NotFound' 
import Home from './app/Pages/Home' 
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fillStore, loggedIn } from './app/actions/guestbookactions'
import EditPost from './app/Pages/EditPost'
import Header from './app/Components/Header'
import LogIn from './app/Pages/LogIn'
import Logout from './app/Pages/Logout'
import Register from './app/Pages/Register'
import { fetchGet } from './app/utils/fetch_functions'



function App() {
   const [data,setData] = useState([]);
   const dispatch = useDispatch(); 

   //fetch  form the Server and fill the Redux store
  useEffect(() => {
    const option = {
      method:'GET',
    }; 
    fetch('http://localhost:3000/api',option)
    .then(res => res.json())
    .then(data => setData(data)); 
  },[]); 

  useEffect(()=> {
    if(data.length > 0 ){
       dispatch(fillStore(data)); 
    }
  },[data]); 

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
