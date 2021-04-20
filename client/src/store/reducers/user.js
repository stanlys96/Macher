const initialState = {
  user: {
    isLoggedIn: localStorage.getItem('isLoggedIn')
  }
}

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'USER/GETUSER':
      return { ...state.user }
    case 'USER/SETUSER':
      return { ...state, user: payload }
    default:
      return state;
  }
}

export default reducer;