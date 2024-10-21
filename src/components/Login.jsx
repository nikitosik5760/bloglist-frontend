import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

export const Login = ({setUser, setErrorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
  return (
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
}

export default Login