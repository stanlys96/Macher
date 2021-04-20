export function setUser(payload) {
  return { type: 'USER/SETUSER', payload }
}

export function getUser() {
  return { type: 'USER/GETUSER' }
}