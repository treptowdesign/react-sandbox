//////////////////////////////////////////////////////////
// SubComponents: PostDetails
//////////////////////////////////////////////////////////

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

export default PostDetails