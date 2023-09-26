
import {  useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  SERVER_HOST, SITE_INFO } from '../config';
import { useEffect } from 'react';
import { fillLastEntries, totalEntries, updateViewsCounter } from '../actions/guestbookactions';



function Header() {
    const currentUser = useSelector(state => state.postReducer.currentUser ); 
    const last_entries = useSelector(state => state.postReducer.last_entries );
    const totalEntries_value = useSelector(state => state.postReducer.total_entries );
    const totalPages_value = useSelector(state => state.postReducer.total_pages );
    const views = useSelector(state => state.postReducer.total_views );

    const dispatch = useDispatch();
    const navigate = useNavigate();




   // limiting the renderd text
    function limitText(text,limit){
        if(text.length > limit ){
            return text.slice(0,limit).toString(); 
        }else {
            return text;
        }
    }

    const fetchData = ()=> {
        const option = {
            method: 'GET',
        };
        fetch(`${SERVER_HOST}/api?limit=${5}&page=${(0)}`, option)
            .then(res => res.json())
            .then(data => {
                dispatch(totalEntries(data.total_entries));
                dispatch(fillLastEntries(data.entries));
            });
    }

    useEffect(()=> {
        fetchData();
        navigate('/');
    },[]);


    return (
       
        
            <>  
            <nav>
               <Link to='/'><h1 className='Logo'>{SITE_INFO.site_title}</h1></Link> 
                <p className='nav__login'>{currentUser === null ? (<><Link to="/register" >Register </Link> <Link to="/login" >Login </Link> </>)  : <Link to="/logout" >{currentUser.username + (' (Logout)')}{currentUser.role === 'admin' ? <span className='login_badge'>Admin</span> : ''}</Link>}</p>
            </nav>
            <section className='nav_guestbook__info '>
                <p className='InfoBadge'><span>{totalEntries_value}</span> Entries </p>
                <p className='InfoBadge'><span>{totalPages_value}</span>Pages</p>
                <p className='InfoBadge '><span>{views}</span>Views</p>
                <div style={currentUser === null ? {backgroundColor:'#BC2525'} : {backgroundColor: '#25BCB6'}} className='login_indicator'></div>
            </section>
            <section className='nav_lastPosts_scrolling'>
                <p className=' lastPosts__title '>last<span> 5 </span>entries</p>
                <section className='scrolling__posts'>
                    <section className='scrolling__posts-content'>

                        {
                            last_entries.length !== 0 ? last_entries.map((post,index) => 
                                
                                <p key={index}> 📝 {limitText(post.comment,40) }.. ◄ <span className='scroll_author'>{post.username}</span></p>
                            ) : <p>No entries... </p>
                        }
                       
                    </section>
                
                </section>
            </section>
            
            </>
          
            

     );
}

export default Header;