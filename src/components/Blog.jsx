import TogleBlogView from "./TogleBlogView"
import blogServise from '../services/blogs'

const Blog = ({ blog,blogs,setBlogs }) => {
  const handleLikeBlog = async() => {
    const likedBlog = await blogServise.likeBlog(blog)
    const blogToUpdate = blogs.find(b=>b.id===likedBlog.id)
    console.log('updated likes:',blogToUpdate.likes, 'on blog', blogToUpdate.title)

    setBlogs(blogs=>blogs.map(b=>b.id !== blogToUpdate.id ? b : likedBlog))
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
      </TogleBlogView>
      
  </div>  
  )
}


export default Blog