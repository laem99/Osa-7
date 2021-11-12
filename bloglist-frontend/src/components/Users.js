import React from 'react'
import { Link } from 'react-router-dom'

const Users = (users) => {

  const table = {
    border: '1px solid blue'
  }

  const row = {
    border: '1px solid lightblue'
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={table}>
        <tbody>
          <tr>
            <th style={row}></th>
            <td style={row}><strong>blogs created</strong></td>
          </tr>
          {users.users.map(user => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users