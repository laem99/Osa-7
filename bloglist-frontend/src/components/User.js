import React from 'react'
import { useParams } from 'react-router'

const User = ({ users }) => {
  const id = useParams().userId
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.map(blog => <ul key={blog.id}><li>{blog.title}</li></ul>)}
    </div>
  )
}

export default User