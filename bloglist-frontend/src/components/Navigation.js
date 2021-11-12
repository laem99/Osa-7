import React from 'react'
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { Blog } from './Blog'
import User from './User'
import Users from './Users'
import styled from 'styled-components'

const Navigation = (props) => {

  const padding = {
    padding: '5px',
    color: 'Blue',
    fontWeight: 'bold',
    fontSize: '16px'
  }

  const margin = {
    marginLeft: '50px'
  }

  return (
    <Router>
      <Navi>
        <Link style={padding} to='/'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        <p style={margin}>{props.user.name} logged in</p>
        <ColoredButton onClick={props.parentLogOut}>Logout</ColoredButton>
      </Navi>
      <Routes>
        <Route path='/' element={props.home} />
        <Route path="blogs/:blogId" element={<Blog blogs={props.blogs} />} />
        <Route path='/users/*' element={<Users users={props.users} />} />
        <Route path="users/:userId" element={<User users={props.users} />} />
      </Routes>
    </Router>
  )
}

const Navi = styled.div`
  background-color: lightblue;
  border: none;
  height: 40px;
  display:flex;
  align-items:center;
  justify-content:center;
`

const ColoredButton = styled.button`
  background-color: salmon;
  border: red 1px solid;
  margin: 5px;
  height: 30px;
  font-weight: 700;
`

export default Navigation