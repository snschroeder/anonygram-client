import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './Components/App/App';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>, document.getElementById('root'));
