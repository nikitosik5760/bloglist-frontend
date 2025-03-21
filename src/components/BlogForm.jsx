import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handlePostBlog = async (e) => {
    e.preventDefault();
    addBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form className="blog-form">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        type="author"
        placeholder="author"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <label htmlFor="url">Url</label>
      <input
        id="url"
        name="url"
        type="url"
        placeholder="url"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit" id="submit" onClick={handlePostBlog}>
        Post Blog
      </button>
    </form>
  );
};
export default BlogForm;
