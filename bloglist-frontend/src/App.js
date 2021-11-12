import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import { connect, useDispatch, useSelector } from 'react-redux'
import { changeNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser } from './reducers/loginReducer'
import BlogList from './components/Blog'
import Navigation from './components/Navigation'

const App = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const allBlogs = useSelector(state => {
    return state.blogs
  })

  const allUsers = useSelector(state => {
    return state.users
  })

  const allComments = useSelector(state => {
    return state.comments
  })

  const login = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser(username, password))
      dispatch(changeNotification('Succesfully logged in', 5))
      setUser(login)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(changeNotification('Wrong username or password, try again', 5))
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    dispatch(changeNotification('Logged out', 5))

    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(changeNotification('error: cound not logout', 5))
    }
  }

  const addBlog = async (event) => {
    setVisible(true)
    event.preventDefault()
    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    await props.createBlog(blogObj)
    dispatch(changeNotification(`a new blog ${blogObj.title} by ${blogObj.author} added`, 5))
    setNewAuthor('')
    setNewUrl('')
    setNewTitle('')
    setVisible(false)
  }

  const Home =
    <>
      <Togglable visible={visible} buttonLabel="create new blog">
        <AddBlog title={newTitle} url={newUrl} author={newAuthor}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleUrlChange={({ target }) => setNewUrl(target.value)}
          handleSubmit={addBlog} />
      </Togglable>
      <h2>blogs</h2>
      <BlogList allBlogs={allBlogs} />
    </>

  const loggedInForm = () => {
    return (
      <div>
        <Navigation user={user} parentLogOut={handleLogOut} home={Home} users={allUsers} blogs={allBlogs} comments={allComments} />
      </div>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username" id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input autoComplete="on" type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)} id="password"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  return (
    <div>
      <Notification />
      {user === null
        ? loginForm()
        : loggedInForm()}
    </div>
  )
}

export default connect(
  null,
  { createBlog, changeNotification, initializeBlogs, loginUser, initializeUsers }
)(App)