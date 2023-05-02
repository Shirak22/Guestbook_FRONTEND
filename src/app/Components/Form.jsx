import { useEffect, useState } from "react";
import { useLocation } from "react-router";


function InputForm({action,user}) {
    const [author, setAuthor] = useState(''); 
    const [region, setRegion] = useState(''); 
    const [title, setTitle] = useState(''); 
    const [content, setContent] = useState('');

    

    useEffect(() => {
    if(user !== null && user.length > 0 ){
            setAuthor(user[0].author)
            setRegion(user[0].region)
            setTitle(user[0].title)
            setContent(user[0].content)
            
        }
    },[user])


    function handleContentState(e){
        let contentFix = e.target.value; 
        setContent(contentFix); 
    }

    useEffect(()=> {
        let date = new Date();

        let newEntry = {
            author: author,
            title: title,
            region: region,
            postDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            content: content,
        }
  
            
            action(newEntry);

    },[content,title,region,author]); 
    return (
        <>
        
           <form >
            <section className="formInput">
                <label htmlFor="author">Your name: </label>
                <input  defaultValue={author} required id="author" type="text" onChange={(e) => setAuthor(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="region">Region: </label>
                <input defaultValue={region} required id="region" type="text" onChange={(e) => setRegion(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="title">Title: </label>
                <input defaultValue={title} required id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="content">Content: </label>
                <textarea defaultValue={content} required id="content" type="text" onChange={handleContentState} />
            </section>

        </form>
        
         
        </>


    );
}

export default InputForm;