import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser);
      setUser(user);
      loginService.setToken(user.token);
    }
    const getBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    getBlogs();
  }, []);

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.loginUser({ username, password });
      loginService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };
  const handlePostBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.postBlog({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
      setSuccessMessage("Blog created!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      setBlogs((blogs) => blogs.concat(newBlog));
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const userForm = () => {
    return (
      <form className="user-form">
        <label htmlFor="username">username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit" onClick={handleLogin}>
          login
        </button>
      </form>
    );
  };
  const blogForm = () => {
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
        <button type="submit" onClick={handlePostBlog}>
          Post Blog
        </button>
      </form>
    );
  };

  if (!user) {
    return (
      <>
        <h1>log in to application</h1>
        {errorMessage ? (
          <Message message={errorMessage} status={"error"} />
        ) : (
          ""
        )}
        {userForm()}
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in</h3>{" "}
      <button type="button" onClick={logout}>
        logout
      </button>
      {errorMessage ? <Message message={errorMessage} status={"error"} /> : ""}
      {successMessage ? (
        <Message message={successMessage} status={"success"} />
      ) : (
        ""
      )}
      {user ? blogForm() : userForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
