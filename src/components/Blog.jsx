const Blog = ({ blog, likeBlog, deleteBlog, currentUser }) => {
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
      <span id="url">{blog.url}</span>
      <span id="likes">
        {blog.likes} <button onClick={handleLike}>like</button>
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
  );
};

export default Blog;
