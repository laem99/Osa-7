const initialState = { value: null }

const notificationReducer = (state = initialState.value, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default: return state
  }
}

export const changeNotification = (notification, time) => {
  let timer
  clearTimeout(timer)
  const n_time = time * 1000

  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: null
      })
    }, n_time)
  }
}

export default notificationReducer