import { useState } from 'react'

const BlogForm = ({ createBlog, setSuccesMessage, setErrorMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async(e) => {
    e.preventDefault()
    try {
      const createdBlog = await createBlog({ title, author, url })
      console.log('blog at the blog form', createdBlog)
      console.log('user of created blog', createdBlog.user)
      setAuthor('')
      setTitle('')
      setUrl('')
      setSuccesMessage(`a new blog ${createdBlog.title} added`)
      setTimeout(() => {
        setSuccesMessage(null)
      }, 10000)
    } catch (exeption) {
      setErrorMessage('Not correct values in input')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      return console.log('exeption', exeption)
    }
  }

  return (
    <div className='blog-form'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
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
    </div>
  )
}

export default BlogForm