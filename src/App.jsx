import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const getBlogs = async() => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
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
      return console.log(exeption)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser('')
    blogService.setToken(null)
  }

  const handleBlogCreation = async(e) => {
    e.preventDefault()
    try {
      const createdblog =  await blogService.create({ title, author, url })
      blogs.push(createdblog)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exeption) {
      return console.log('exeption', exeption)
    }

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
      <button type='submit'>submit</button>
    </form>
  )

  if (!user) {
    return (
      <div>
        <h1>log in to aplication</h1>
        {login()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title:
          <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type='submit'>create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App