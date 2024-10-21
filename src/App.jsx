import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './global.css'
import { Notification } from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async(e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username,
        password
      })
      localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      setErrorMessage("Wrong password or username")
      setTimeout(()=>{
        setErrorMessage(null)
      }, 3000)
      return console.log(exeption)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
    blogService.setToken(null)
  }



  const login = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password:
        <input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        >
        </input>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  if (!user) {
    return (
      <div>
        <Notification message={errorMessage} type={"error-msg"}></Notification>
        <h1>log in to aplication</h1>
        {login()}
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
      <BlogForm 
      setBlogs={setBlogs} 
      setSuccesMessage={setSuccesMessage}
      setErrorMessage={setErrorMessage}
      ></BlogForm>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App