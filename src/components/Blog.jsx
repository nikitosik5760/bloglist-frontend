import TogleBlogView from './TogleBlogView'
import blogServise from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs,setSuccesMessage,setErrorMessage }) => {
  const handleLikeBlog = async() => {
    try{
      const likedBlog = await blogServise.likeBlog(blog)
      console.log('updated likes:',likedBlog.likes, 'on blog', likedBlog.title)

      setBlogs(blogs => blogs.map(b => b.id !== likedBlog.id ? b : likedBlog))
      setSuccesMessage(`Liked blog ${likedBlog.title}`)
      setTimeout(() => {
        setSuccesMessage(null)
      }, 10000)
    } catch (exeption) {
      setErrorMessage('Something went wrong, cant like')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      return console.log(exeption)
    }
  }

  const handleDeleteBlog = async() => {
    try {
      if(window.confirm(`Do you really want to delete blog ${blog.title}`)) {
        await blogServise.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))

        setSuccesMessage('blog removed')
        setTimeout(() => {
          setSuccesMessage(null)
        }, 10000)
      }
    } catch (exeption) {
      setErrorMessage('Cant remove blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      return console.log(exeption)
    }

  }

  return(
    <div className="blog">
      {blog.title}
      <TogleBlogView>
        {blog.url}
        <br/>
        {blog.likes}
        <button
          className="like-btn"
          onClick={handleLikeBlog}
        >like</button>
        <br/>
        {blog.user.name}
        <br/>
        <button
          className="remove-btn"
          onClick={handleDeleteBlog}
        >remove</button>
      </TogleBlogView>

    </div>
  )
}


export default Blog