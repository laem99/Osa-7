import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  let id = null
  let blogToChange = null
  let changed = {}
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE':
    id = action.id
    blogToChange = state.find(b => b.id === id)
    changed = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : changed)
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE_BLOG':
    id = action.blog.id
    blogService.deleteBlog(action.blog)
    return state.filter(b => b.id !== id)
  case 'COMMENT':
    return [...state, action.comment]
  default: return state
  }
}

export const createBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    await dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const committing = (comment, id) => {
  return async dispatch => {
    const newComment = await blogService.comment(comment, id)
    await dispatch({
      type: 'COMMENT',
      data: newComment,
    })
  }
}

export const removeIt = (blog) => {
  return async dispatch => {
    await dispatch({
      type: 'REMOVE_BLOG',
      blog: blog,
    })
    blogService.deleteBlog(blog)
  }
}

export const addLike = (blog) => {
  return async dispatch => {
    await dispatch({
      type: 'LIKE',
      id: blog.id
    })
    await blogService.update(blog)
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default reducer