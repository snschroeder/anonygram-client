import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import './Header.css';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

class Header extends Component {
  static contextType = UserContext;

  state = {
    auth: TokenService.hasAuthToken(),
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({
      auth: TokenService.hasAuthToken()
    });
  }

  render() {
    const { userLocation, newContentLoaded, updateNewContent, path, ...rest } = this.props

    return (
      <header aria-labelledby='primary-navigation' >
        {/* <img className='App-logo' src='images/icon.png' alt='logo'/>{' '} */}
        <div className='Header___leftContainer'>
          {(path === '/p/:submissionId') ? (
            <Link to="/" className="header appName resetStyles bold">
              <ArrowBackIosIcon />
            </Link>
          ) : (
            <>
              <Link to="/" className="header appName resetStyles bold">
                Anonygram
              </Link>{' '}
              <SubmissionForm
                routeProps={rest}
                userLocation={userLocation}
                newContentLoaded={newContentLoaded}
                updateNewContent={updateNewContent}
                parent='Header'
              />
            </>
          )}
        </div>

        {TokenService.hasAuthToken() ? (
          <div className='Header__div'>
            <Link
              to="/login"
              className="Header__link resetStyles"
              onClick={this.handleLogout}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className='Header__div'>
            <Link to="/login" className="Header__link resetStyles">
              Login
            </Link>
            <Link to="/register" className="Header__link resetStyles">
              Register
            </Link>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
