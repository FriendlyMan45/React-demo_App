import Posts from "./Posts";

function Feed({posts}){
    return(
        <>
            {posts.map(post=> (
                <Posts 
                    key={post.id}
                    posts={post}
                />
            ))}
        </>
    );
}

export default Feed;