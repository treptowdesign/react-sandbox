import React, { useState } from 'react'

//////////////////////////////////////////////////////////
// SubComponents: PostList
//////////////////////////////////////////////////////////

const PostList = ({ posts, activePostId, onViewPost, onCreateNewPost }) => {
    const [isDsc, setIsDsc] = useState(true)
    const orderedPosts = isDsc ? [...posts] : [...posts].reverse() 
    return (
        <div className="post-list">
            <h2>Post List <button onClick={() => setIsDsc(!isDsc)}>Order: {isDsc ? 'Dsc' : 'Asc'}</button></h2>
            <ul>
                {orderedPosts.map((post) => (
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
        </div> 
    );
};

export default PostList