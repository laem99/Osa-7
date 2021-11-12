import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  default: return state
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password,
    })
    await dispatch({
      type: 'LOGIN',
      user: user,
    })
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
  }
}

export default loginReducer