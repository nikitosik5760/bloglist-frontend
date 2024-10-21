import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({setBlogs, setSuccesMessage, setErrorMessage}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async(e) => {
    e.preventDefault()
    try {
      const createdblog = await blogService.create({ title, author, url })
      setBlogs(b=>b.concat(createdblog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setSuccesMessage(`a new blog ${createdblog.title} added`)
      setTimeout(() => {
        setSuccesMessage(null)
      }, 15000)
    } catch (exeption) {
      setErrorMessage(exeption.toString())
      setTimeout(()=>{
        setErrorMessage(null)
      }, 15000)
      return console.log('exeption', exeption)
    }
  }

  return (
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
  )
}

export default BlogForm