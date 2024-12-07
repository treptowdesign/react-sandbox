import React, { useState } from 'react'
import Navi from '@/components/Navi/Navi'
import './MiniBlog.sass'
import seedData from './seedData'
import PostForm from './PostForm'
import PostDetails from './PostDetails'
import PostList from './PostList'

//////////////////////////////////////////////////////////
// Notes
//////////////////////////////////////////////////////////

// [x] switch activePost from object based to index based
// [x] split out handleSubmitPost into two create/update handlers
// [x] move seedData to its own file & import
// [x] lift formState from PostForm to parent comp. & remove useEffect, handle via props
// [x] switch from index to Id for posts
// [x] split postList into its own subcomp PostList  
// [x] split subcomponents into component files and import 
// [ ] add ordering and categorization of posts (PostList) 
// [ ] handle post deletion (and syncing id counter)
// [ ] in PostForm break out form inputs into their own subcomponents

//////////////////////////////////////////////////////////
// Main Component
//////////////////////////////////////////////////////////

const MiniBlog = () => {
    const formDefaults = { title: "", author: "", content: "", featured: false } // blank form values
    const [posts, setPosts] = useState(seedData)
    const [activePostId, setActivePostId] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formState, setFormState] = useState(formDefaults)
    const [idCounter, setIdCounter] = useState(seedData.length)

    const handleCreateNewPost = () => { // takes the user to the blank PostForm
        setActivePostId(null)
        setFormState(formDefaults)
        setIsEditing(false) 
    }

    const handleViewPost = (id) => { // sets a post to active by id
        const post = posts.find((p) => p.id === id);
        setActivePostId(id)
        setFormState(post)
        setIsEditing(false)
    }

    const handleEditing = () => { // takes the user from post details to PostForm edit mode
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
        setPosts((prevPosts) => [...prevPosts, newPost]) // add new post to the posts array
        setActivePostId(newPost.id); // set the new post as the active post
        setIdCounter((prevCounter) => prevCounter + 1) // increment ID counter
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

export default MiniBlog