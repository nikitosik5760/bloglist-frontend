import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken= (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers : { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log('server response',response.data)
  return response.data
}

const likeBlog = async blogToLike => {
  const config = {
    headers : { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${blogToLike.id}`,
    {
      user:blogToLike.user.id,
      likes:blogToLike.likes + 1,
      author:blogToLike.author,
      title:blogToLike.title,
      url:blogToLike.url
    },
    config
    )

    return response.data
}

export default { 
  setToken, 
  getAll,
  create,
  likeBlog,
  }