const Blog = ({ blog, likeBlog, deleteBlog }) => {
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
      <button className="remove-blog" onClick={handleDelete}>
        remove
      </button>
    </div>
  );
};

export default Blog;
