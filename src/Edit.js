import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

function Edit(){
    const { posts, editBody, editTitle, setEditBody, setEditTitle, handleUpdate } = useContext(DataContext);
    const { id } =useParams();
    const post = posts.find(post => (post.id).toString()===id);

    useEffect(() => {
        if(post){
            setEditTitle(post.title);   
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    return(
            <main>
                {
                    editTitle && 
                        <>
                            <h2>Edit Post</h2>
                            <form onSubmit={(e)=>e.preventDefault()} className="formPost">
                            <label htmlFor="title">Title:</label>
                            <input 
                                id="title"
                                type="text"
                                value={editTitle}
                                onChange={e=>setEditTitle(e.target.value)}
                                required
                            />
                            <label htmlFor="post">Post:</label>
                            <input 
                                id="post"
                                type="text"
                                value={editBody}
                                onChange={e=>setEditBody(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                onClick={()=> handleUpdate(post.id)}
                                >Submit</button>
                            </form>
                        </>
                }
                {
                    !editTitle && 
                    <>
                        <h2>Post Not Found</h2>
                    </>
                }
            </main>
    );
}

export default Edit;