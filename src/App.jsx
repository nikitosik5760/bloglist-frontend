import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Message from "./components/Message";
import Togglable from "./components/Togglable";
import UserForm from "./components/UserForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  // TODO make that logout is called when token expires
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const likeBlog = async (blogObj) => {
    const likedBlog = await blogService.likeBlog(blogObj);
    setBlogs((blogs) =>
      blogs.map((blog) => {
        if (blog.id === likedBlog.id) {
          return likedBlog;
        } else {
          return blog;
        }
      }),
    );
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const loginUser = async (userObj) => {
    try {
      const user = await loginService.loginUser(userObj);
      setUser(user);
      loginService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const addBlog = async (blogObj) => {
    try {
      const newBlog = await blogService.postBlog(blogObj);
      setBlogs((blogs) => blogs.concat(newBlog));
      setSuccessMessage("Blog created!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (exception) {
      console.log(exception);
      setErrorMessage("Blog input is invalid");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
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
        <UserForm loginUser={loginUser} setErrorMessage={setErrorMessage} />
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
      <Togglable buttonLabel="create new blog">
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} className="container-blog">
            {blog.title}
            <Togglable buttonLabel={"view"}>
              <Blog blog={blog} likeBlog={likeBlog} />
            </Togglable>
          </div>
        ))}
    </div>
  );
};

export default App;
