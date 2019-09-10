import API from '../api'
import Router from '../router'

export function getLocalToken () {
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    return null
  }
  return tokenStr
}

export function getUser () {
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    return null
  }

  return new Promise((resolve, reject) => {
    API.get(`auth/me/`, { headers: {
      'Authorization': `Bearer ${tokenStr}`
    } })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
