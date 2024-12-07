import React, { useState, useEffect } from 'react';
import './MiniBlog.sass';
import Navi from '@/components/Navi/Navi';

//////////////////////////////////////////////////////////
// Notes
//////////////////////////////////////////////////////////
// [x] switch activePost from object based to index based
// [ ] split into component files and import
// [ ] add ordering and categorization of posts

//////////////////////////////////////////////////////////
// Data 
//////////////////////////////////////////////////////////

const seedData = [
    {
        title: 'Sample Post Number One',
        content: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur curabitur fermentum semper cubilia maecenas natoque proin. Ultrices sed consectetur taciti interdum purus taciti.',
        featured: true,
        author: 'Steve Stephens',
        postDate: '2024-12-06'
    },
    {
        title: 'The Second Post',
        content: 'Lacinia suspendisse primis; posuere cursus auctor felis. Vitae nisi non lectus facilisis ultricies torquent facilisi. Tortor vestibulum suspendisse nulla nulla finibus arcu lobortis praesent.',
        featured: false,
        author: 'James Glibson',
        postDate: '2024-12-06'
    },
    {
        title: 'Third Post in the Series',
        content: 'Magna arcu nisl viverra consectetur per mollis ridiculus. Urna penatibus ultricies aliquet felis posuere at proin. Maximus orci dui pellentesque imperdiet maximus parturient risus eros.',
        featured: true,
        author: 'Tad Jackson',
        postDate: '2024-12-06'
    },
    {
        title: 'Post Number Four',
        content: 'Ut non congue amet dictum; nibh nunc bibendum cubilia. Penatibus eu curae habitasse leo fermentum. Nullam sed nisl auctor torquent taciti in ullamcorper faucibus. ',
        featured: false,
        author: 'Sal Marksman',
        postDate: '2024-12-06'
    },
    {
        title: 'Fifth Post Here',
        content: 'Feugiat habitant morbi in habitant ac. Vehicula velit torquent varius ridiculus dis tellus in mattis. Habitant leo ligula commodo dignissim, orci iaculis enim sollicitudin. Mauris ultrices eros dui cras praesent sed vel. Inceptos facilisi platea magna.',
        featured: false,
        author: 'Tess Reckless',
        postDate: '2024-12-06'
    },
    
];

//////////////////////////////////////////////////////////
// SubComponents
//////////////////////////////////////////////////////////

const PostForm = ({post, onPostSubmit}) => {
    const [formState, setFormState] = useState({
        title: post ? post.title : "",
        author: post ? post.author : "",
        content: post ? post.content : "",
        featured: post ? post.featured : false,
    });

    // keep an eye on 'post' reset when its null
    useEffect(() => {
        setFormState({
            title: post ? post.title : "",
            author: post ? post.author : "",
            content: post ? post.content : "",
            featured: post ? post.featured : false,
        });
    }, [post]);

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
        // reset when you submit a new post too 
        setFormState({
            title: "",
            author: "",
            content: "",
            featured: false,
        });
    };

    return (
        <div className="post-form">
            <h2>{post ? "Edit Post" : "Create a New Post"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="control">
                    <label>Post Title: </label>
                    <input
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="control">
                    <label>Post Author: </label>
                    <input
                        name="author"
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
                        <span>Featured</span>
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
            <h2>{post.title}</h2>
            <p>Author: {post.author} | Date: {post.postDate}</p>
            <p>{post.content}</p>
            <button onClick={onEditPost} >Edit Post</button>
        </div>
    );
}

//////////////////////////////////////////////////////////
// Main Component
//////////////////////////////////////////////////////////

const MiniBlog = () => {
    const [posts, setPosts] = useState(seedData);
    const [activePost, setActivePost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // const activePostIndex = activePost ? posts.findIndex((post) => post === activePost) : null;

    const handleCreateNewPost = () => {
        console.log('Create a New Post')
        setIsEditing(false)
        setActivePost(null)
    }

    const handleViewPost = (index) => {
        console.log(`View Post: ${index}`)
        setIsEditing(false)
        setActivePost(index)
    }

    const handleEditing = () => {
        console.log('Edit the active post')
        setIsEditing(true)
    }

    const handleSubmitPost = (formData) => {
        if (activePost != null) {
            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts]; // create a shallow copy of the array
                updatedPosts[activePost] = { ...prevPosts[activePost], ...formData }; // update the specific post
                return updatedPosts;
            });
        }else { // add new post
            const newPost = {
                ...formData,
                postDate: new Date().toISOString().split("T")[0], // add in date value, leave out time
            };
            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts, newPost];
                const newIndex = updatedPosts.length - 1; // calculate the index of the new post (last added one)
                setActivePost(newIndex); // set the new post as the active post
                return updatedPosts;
            });
            
        }
        setIsEditing(false)
    };

    const postList = posts.map((post, index) => {
        return (
            <li key={index}>
                <span className={'post-item' + ( activePost === index ? ' active' : '')}>{post.title} </span>
                <button onClick={() => handleViewPost(index)}>
                    View Post
                </button>
            </li>
        ); 
    });

  return (
    <>
      <Navi />
      <div className="mini-blog">
        <h1>MiniBlog</h1>
        <div className="dev">
            Active Post: {activePost != null ? activePost : 'none'}
        </div>
        <div className="blog-body">
            <aside>
                <ul>
                    {postList}
                </ul>
                <button onClick={handleCreateNewPost}>+ Create New Post</button>
            </aside>
            <main>
                {activePost != null && !isEditing ? (
                    <PostDetails post={posts[activePost]} onEditPost={handleEditing} />
                ) : (
                    <PostForm post={posts[activePost]} onPostSubmit={handleSubmitPost} />
                )}
            </main>
        </div>
      </div>
    </>
  );
};

export default MiniBlog; 
