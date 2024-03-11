import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";


function PostPage(){
    const { posts, handleDelete } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post=> (post.id).toString()===id);
    
    return(
        <main>
            <article>
                { post &&
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.datetime}</p>
                        <p>{post.body}</p>
                        
                        <Link to={`/edit/${post.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button
                            onClick={()=>handleDelete(post.id)}
                        >Delete</button>
                    </>
                }
                {
                    !post && 
                    <>
                        <h2>Post Not Found</h2>
                    </>
                }
            </article>
        </main>
    );
}

export default PostPage;