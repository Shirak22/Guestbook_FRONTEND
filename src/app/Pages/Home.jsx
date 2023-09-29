import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fillStore, totalEntries, totalPages } from "../actions/guestbookactions";
import { GUESTBOOK_SETTINGS, SERVER_HOST} from "../config";

function Home() {
    const posts = useSelector(state => state.postReducer.posts);
    const total_entries = useSelector(state => state.postReducer.total_entries);
    const [page,setPage] = useState(0); // the current page 
    const [pageCount,setPageCount] = useState(0); //the number of pages 
    const entriesPerPage = GUESTBOOK_SETTINGS.numberOfEntriesPerPage; //the number of the entries in a page you can change it in the config file. 
    const numbersPagesToRender = Array.from({length:20},(_,index)=> (index + 1) + 1); //array of the numbers to be renderd as buttens point to specific page . 


    const dispatch = useDispatch();

    const nextPage = () => {
        setPage((p)=> {
            if(p == pageCount) return p  ; 
            return p + 1; 
        });
    }

    const previousPage = () => {
        setPage((p)=> {
            if(p == 0) return p ; 
            return p - 1; 
        });
    }

    const handlePageNumber = (e)=> {
        setPage(()=> {
            return parseInt(e.target.innerText - 1)
        });
    }

    const fetchData = ()=> {
        const option = {
            method: 'GET',
        };
        fetch(`${SERVER_HOST}/api?limit=${entriesPerPage}&page=${(page) * entriesPerPage}`, option)
            .then(res => res.json())
            .then(data => {
                dispatch(fillStore(data.entries));
                dispatch(totalEntries(data.total_entries));

            });
    }
    //fetch  form the Server and fill the Redux store
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(()=> {
        let total_pages = Math.ceil(total_entries/entriesPerPage); 
        fetchData();
        setPageCount(total_pages); 
        dispatch(totalPages(total_pages));
    },[total_entries,page]);

    return (
        <>
            <section className="entries__container">


                <Link className="Sign__button" to="/sign" >Sign Guestbook</Link>
                {
                    posts && posts.map((post, index) =>
                    (
                        <PostCard key={index} data={post} />
                    )

                    )
                }


            </section>
          { (page > 0) ? (<footer className="pagination">
                <button disabled={page === 0} onClick={previousPage}>previous</button>
                <div className="pagination_page_number">{numbersPagesToRender && numbersPagesToRender.map((number,index) => {
                    return <button key={index} className={page === index ? 'active': ''} onClick={handlePageNumber}>{number - 1}</button>
                })}</div>
                <button disabled={page === pageCount - 1} onClick={nextPage}>next</button>
            </footer>) : ''
            }
        </>

    );
}

export default Home;