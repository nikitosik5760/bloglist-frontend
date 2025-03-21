const Blog = ({ blog, likeBlog }) => {
  const handleLike = () => {
    likeBlog(blog);
  };

  return (
    <div className="blog">
      <span id="url">{blog.url}</span>
      <span id="likes">
        {blog.likes} <button onClick={handleLike}>like</button>
      </span>
      <span id="username">{blog.user.username}</span>
    </div>
  );
};

export default Blog;
