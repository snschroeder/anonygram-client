import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'

import './Register.css';

class Register extends Component {

  state = {
    error: null
  }

  handleRegisterSuccess = () => {
    this.props.history.push('/login')
  }

  submitForm = (e) => {
    e.preventDefault()
    const { username, password } = e.target
    AuthApiService.postUser({
      username: username.value,
      password: password.value,
    })
      .then(user => {
        username.value = ''
        password.value = ''
        this.handleRegisterSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state
    return (
      <section className="register-page">
        <div className="flex-container">
          <h2>Register</h2>
          <form method="post" onSubmit={e => this.submitForm(e)}>
            <div>
              <div role='alert'>
                {error && <p>{error}</p>}
              </div>
              <label htmlFor='registration-username-input'>
                Choose a username
          </label>
              <input
                id='registration-username-input'
                type='text'
                name='username'
                placeholder='username'
                aria-label="username"
                required
              />
            </div>
            <div>
              <label htmlFor='registration-password-input'>
                Choose a password </label>
              <input
                id='registration-password-input'
                type='password'
                name='password'
                placeholder='password'
                aria-label='password'
                required
              />
            </div>
            <div>
              <label htmlFor='registration-isValid-input'>
                Confirm password </label>
              <input
                id='registration-isValid-input'
                type='password'
                name='isValid'
                placeholder='password'
                aria-label='password'
                required
              />
            </div>
            <footer>
              <button className='Register__button' type='submit' name='submit'>
                Sign up
              </button>
            </footer>
          </form>
        </div>
      </section>
    );
  }
}

export default Register