import React, { useState } from 'react';
import Navi from '@/components/Navi/Navi';
import './MiniBlog.sass';
import seedData from './seedData';

//////////////////////////////////////////////////////////
// Notes
//////////////////////////////////////////////////////////

// [x] switch activePost from object based to index based
// [x] split out handleSubmitPost into two create/update handlers
// [x] move seedData to its own file & import
// [x] lift formState from PostForm to parent comp. & remove useEffect, handle via props
// [x] switch from index to Id for posts
// [x] split postList into its own subcomp PostList  
// [ ] add ordering and categorization of posts
// [ ] split subcomponents into component files and import 
// [ ] handle post deletion (and syncing id counter)

//////////////////////////////////////////////////////////
// SubComponents
//////////////////////////////////////////////////////////

const PostForm = ({formState, setFormState, onPostSubmit}) => {

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onPostSubmit(formState); 
    };

    return (
        <div className="post-form">
            <h2>{formState.title ? "Edit Post" : "Create a New Post"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="control">
                    <label>Post Title: </label>
                    <input
                        name="title"
                        type="text"
                        placeholder='Post Title'
                        value={formState.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="control">
                    <label>Post Author: </label>
                    <input
                        name="author"
                        type="text"
                        placeholder='Post Author'
                        value={formState.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="control">
                    <label>Post Content: </label>
                    <textarea
                        rows={5}
                        cols={40}
                        name="content"
                        value={formState.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="control">
                    <label>
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formState.featured}
                            onChange={handleChange}
                        />
                        <span> &nbsp; Featured</span>
                    </label>
                </div>
                <button type="submit">Publish Post</button>
            </form>
        </div>
    );
}

const PostDetails = ({post, onEditPost}) => {
    return (
        <div className="post-details">
            {post.featured && <div className="featured-post">Featured Post</div>}
            <h2>{post.title} (id: {post.id})</h2>
            <p>Author: {post.author} | Date: {post.postDate}</p>
            <p>{post.content}</p>
            <button onClick={onEditPost} >Edit Post</button>
        </div>
    );
}

const PostList = ({ posts, activePostId, onViewPost, onCreateNewPost }) => {
    return (
        <>
            <h2>Post List</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <button
                            className={activePostId === post.id ? 'active' : ''}
                            onClick={() => onViewPost(post.id)}
                        >
                            {post.title} (id: {post.id})
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={onCreateNewPost}>
                        + Create New Post
                    </button>
                </li>
            </ul>
        </>
        
    );
};

//////////////////////////////////////////////////////////
// Main Component
//////////////////////////////////////////////////////////

const MiniBlog = () => {
    const formDefaults = { title: "", author: "", content: "", featured: false }; // blank form values
    const [posts, setPosts] = useState(seedData);
    const [activePostId, setActivePostId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState(formDefaults);
    const [idCounter, setIdCounter] = useState(seedData.length);

    const handleCreateNewPost = () => { // takes the user to the blank PostForm
        // console.log('Create a New Post')
        setActivePostId(null)
        setFormState(formDefaults)
        setIsEditing(false) 
    }

    const handleViewPost = (id) => { // sets a post to active by id
        // console.log(`View Post: ${id}`)
        const post = posts.find((p) => p.id === id);
        setActivePostId(id)
        setFormState(post)
        setIsEditing(false)
    }

    const handleEditing = () => { // takes the user from post details to PostForm edit mode
        // console.log('Edit the active post')
        setIsEditing(true)
    }

    const handleSubmitPost = (formData) => {
        if (activePostId != null) { 
            updatePost(formData) // update exising
        } else { 
            addPost(formData) // add new post
        }
        setIsEditing(false)
    };

    const updatePost = (formData) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === activePostId ? { ...post, ...formData } : post
            )
        );
    };

    const addPost = (formData) => {
        const newPost = {
            ...formData,
            id: idCounter.toString(), // assign the current value of idCounter as the ID
            postDate: new Date().toISOString().split('T')[0], // generate the current date
        };
        setPosts((prevPosts) => [...prevPosts, newPost]); // add new post to the posts array
        setActivePostId(newPost.id); // set the new post as the active post
        setIdCounter((prevCounter) => prevCounter + 1); // increment ID counter
    };


  return (
    <>
      <Navi />
      <div className="mini-blog">
        <h1>MiniBlog</h1>
        <div className="blog-body">
            <aside>
                <PostList
                    posts={posts}
                    activePostId={activePostId}
                    onViewPost={handleViewPost}
                    onCreateNewPost={handleCreateNewPost}
                />
            </aside>
            <main>
                {(activePostId != null && !isEditing) ? (
                    <PostDetails post={posts.find((p) => p.id === activePostId)} onEditPost={handleEditing} />
                ) : (
                    <PostForm formState={formState} setFormState={setFormState} onPostSubmit={handleSubmitPost} />
                )}
            </main>
        </div>
      </div>
    </>
  );
};

export default MiniBlog; 