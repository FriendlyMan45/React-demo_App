import { createContext, useState, useEffect } from "react";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import api from "../Api/Posts";
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postbody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [posts, setPosts] = useState([]);
    const { width } = useWindowSize();


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const getPosts = await api.get('/posts');
                setPosts(getPosts.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        const filterResult = posts.filter(post =>
            (post.body).toLowerCase().includes(search.toLowerCase())
            ||
            (post.title).toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(filterResult.reverse());
    }, [posts, search]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const postId = posts.length ? posts[posts.length - 1].id + 1 : 0;
        const postTimeStamp = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {
            id: postId,
            title: postTitle,
            datetime: postTimeStamp,
            body: postbody
        }
        const newPosting = await api.post('/posts', newPost);
        const updatedPosts = [...posts, newPosting.data];
        setPosts(updatedPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/');
    }

    const handleDelete = async (id) => {
        await api.delete(`posts/${id}`)
        const updatedPost = posts.filter(post => post.id !== id);
        setPosts(updatedPost);
        navigate('/');
    }

    const handleUpdate = async (id) => {
        const postTimeStamp = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {
            id,
            title: editTitle,
            postTimeStamp,
            body: editBody
        }
        const updatedPost = await api.put(`posts/${id}`, newPost);
        setPosts(posts.map(post => post.id === id ? { ...updatedPost.data } : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
    }



    return (
        <DataContext.Provider value={{
            width, search, setSearch, posts, searchResult, handleSubmit,
            postTitle, setPostTitle, postbody, setPostBody, handleDelete,
            editBody, editTitle, setEditBody, setEditTitle, handleUpdate
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;