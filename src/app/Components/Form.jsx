import { useEffect, useState } from "react";


function InputForm({action,initial}) {
    const [author, setAuthor] = useState(""); 
    const [region, setRegion] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");


    useEffect(()=> {
        let date = new Date();
        let  newEntry = {
            author: author,
            title: title,
            region: region,
            postDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            content: content,
        }
        action(newEntry);
    },[content,title,region,author]); 

    return (
        <>
         <form >
            <section className="formInput">
                <label htmlFor="author">Your name: </label>
                <input defaultValue={initial.author} required id="author" type="text" onChange={(e) => setAuthor(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="region">Region: </label>
                <input defaultValue={initial.region} required id="region" type="text" onChange={(e) => setRegion(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="title">Title: </label>
                <input defaultValue={initial.title} required id="title" type="text" onChange={(e) => setTitle(e.target.value)} />
            </section>
            <section className="formInput">
                <label htmlFor="content">Content: </label>
                <textarea defaultValue={initial.content} required id="content" type="text" onChange={(e) => setContent(e.target.value)} />
            </section>

        </form>
        </>


    );
}

export default InputForm;