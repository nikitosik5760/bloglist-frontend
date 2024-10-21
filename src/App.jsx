import { useState, useEffect } from 'react'
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

  if (!user) {
    return (
      <div>
        <Notification message={errorMessage} type={"error-msg"}></Notification>
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
      <h2>create new</h2>
      <Toggleble buttonLabel='create post'>
      <BlogForm 
      setBlogs={setBlogs} 
      setSuccesMessage={setSuccesMessage}
      setErrorMessage={setErrorMessage}
      ></BlogForm>
      </Toggleble>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App