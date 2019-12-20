import config from '../config'
import TokenService from './token-service'


const AuthApiService = {
  getUser(user_id) {
    return fetch(`${config.API_ENDPOINT}/api/users/${user_id}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
   },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
  },
  refreshToken() {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/api/auth/`, {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}
    
export default AuthApiService;
