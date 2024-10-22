import { useState, useEffect, useRef } from 'react'
import './global.css'
import blogService from './services/blogs'
import { Notification } from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Toggleble from './components/Toggleble'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const getBlogs = async() => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
    blogService.setToken(null)
  }

  const createBlog = async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.create(blogObject)
    console.log('blog added to the blogs', createdBlog)
    setBlogs(b => b.concat(createdBlog))
    console.log(blogs)
    return createdBlog
  }

  if (!user) {
    return (
      <div>
        <Notification message={errorMessage} type={'error-msg'}></Notification>
        <h1>log in to aplication</h1>
        <Login setUser={setUser} setErrorMessage={setErrorMessage}></Login>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} type={'error-msg'}></Notification>
      <Notification message={succesMessage} type={'success-msg'}></Notification>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Toggleble buttonLabel='create post' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
          setSuccesMessage={setSuccesMessage}
          setErrorMessage={setErrorMessage}
        ></BlogForm>
      </Toggleble>
      {blogs
        .sort((cb, nb) => {
          if(cb.likes < nb.likes) {
            return 1
          }
          if(cb.likes > nb.likes) {
            return -1
          }
          if(cb.likes === nb.likes) {
            return 0
          }
        })
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setSuccesMessage={setSuccesMessage}
            setErrorMessage={setErrorMessage}
          />
        )
      }
    </div>
  )
}

export default App