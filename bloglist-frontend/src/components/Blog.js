import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { addLike, removeIt, committing } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { changeNotification } from '../reducers/notificationReducer'
import AddComment from './AddComment'
import styled from 'styled-components'

export const Blog = ({ blogs }) => {

  const [comment, setComment] = useState('')
  const id = useParams().blogId
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(addLike(blog))
    dispatch(changeNotification(`you liked ${blog.author}s post`, 5))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeIt(blog))
      dispatch(changeNotification(`${blog.title} deleted`, 5))
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(committing(comment, blog.id))
    setComment('')
    dispatch(changeNotification(`Comment added for ${blog.title}`, 5))
  }

  const title = {
    color: 'blueViolet',
    fontSize: '35px'
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2 style={title}>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <p>{blog.likes} likes</p>
        <button id="like" onClick={like}>Like</button>
      </div>
      <p>Added by {blog.author}</p>
      <button id="remove" onClick={removeBlog}>Remove</button>

      <h3>Comments</h3>
      <AddComment handleCommentSubmit={addComment} comment={comment} handleCommentChange={({ target }) => setComment(target.value)} />
      {(blog.comments.length === 0)
        ? <p>No comments yet</p>
        : blog.comments.map((comment, id) => <ul key={id}><li>{comment}</li></ul>)}
    </div>
  )
}

const BlogList = (allBlogs) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    allBlogs.allBlogs.sort((a, b) => b.likes - a.likes).map(blog => {
      return (
        <Divider key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
        </Divider>
      )
    })
  )
}

const Divider = styled.div`
  padding: 10px;
  font-size: 18px;
`

export default BlogList