import React from 'react';
import ReactDOM from 'react-dom';
import Information from './Information';
import { BrowserRouter } from "react-router-dom";



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter> <Information/></BrowserRouter> , div);
  ReactDOM.unmountComponentAtNode(div);
});