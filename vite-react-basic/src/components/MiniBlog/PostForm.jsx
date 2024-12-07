//////////////////////////////////////////////////////////
// SubComponents: PostForm
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
        e.preventDefault()
        onPostSubmit(formState)
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

export default PostForm