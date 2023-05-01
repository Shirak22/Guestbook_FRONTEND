
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignGuestBook from './app/Pages/SignGuestBook' 
import NotFound from './app/Pages/NotFound' 
import Home from './app/Pages/Home' 
import './style/App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fillStore } from './app/actions/guestbookactions'
import { fetchUsers } from './app/actions/authActions'
import EditPost from './app/Pages/EditPost'
import Header from './app/Components/Header'
import LogIn from './app/Pages/LogIn'


function App() {
   const [data,setData] = useState([]);
   const [userData,setUserData] = useState([]); 
   const dispatch = useDispatch(); 

  useEffect(() => {
    fetch('/usersData.json')
    .then(response => response.json())
    .then(users => setUserData(users))
    .catch(err => console.log(err))


    fetch('/commentsData.json')
      .then(response => response.json())
      .then(posts => setData(posts))
      .catch(err => console.log(err))


  },[]); 
  

  
  useEffect(()=> {
    if(data.length > 0 ){
      dispatch(fillStore(data)); 
    }
  },[data]); 

  
  useEffect(()=> {
    if(userData.length > 0 ){
      dispatch(fetchUsers(userData))
    }
  },[userData]); 


  return (
   <BrowserRouter>
    <Header /> 
    <Routes>
      <Route index element={<Home /> } /> 
      <Route path='/sign' element={<SignGuestBook /> } />
      <Route path='/Edit/:id' element={<EditPost /> } />
      <Route path='/Login' element={<LogIn /> } />
      <Route path='*' element={<NotFound /> } /> 
    </Routes>
   </BrowserRouter>
  )
}

export default App
