import Togglable from "./Togglable";

const Blog = ({ blog, likeBlog, deleteBlog, currentUser, buttonLabel }) => {
  const handleLike = () => {
    likeBlog(blog);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog">
      <span id="title">{blog.title} </span>
      <span id="author">{blog.author}</span>
      <Togglable buttonLabel={buttonLabel}>
        <div className="blog-content">
          <span id="url">{blog.url}</span>
          <span id="likes">
            {blog.likes}
            <button onClick={handleLike} id="like-button">
              like
            </button>
          </span>
          <span id="username">{blog.user.username}</span>
          <button
            style={
              currentUser.username === blog.user.username
                ? { display: "block" }
                : { display: "none" }
            }
            className="remove-blog"
            onClick={handleDelete}
          >
            remove
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
