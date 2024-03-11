import { useContext } from "react";
import DataContext from "./context/DataContext";

function NewPost(){
    const { handleSubmit, postTitle, setPostTitle, postbody, setPostBody } = useContext(DataContext);
    return(
        <main>
            <h2>New Post</h2>
            <form onSubmit={handleSubmit} className="formPost">
                <label htmlFor="title">Title:</label>
                <input 
                    id="title"
                    type="text"
                    value={postTitle}
                    onChange={e=>setPostTitle(e.target.value)}
                    required
                />
                <label htmlFor="post">Post:</label>
                <input 
                    id="post"
                    type="text"
                    value={postbody}
                    onChange={e=>setPostBody(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}

export default NewPost;