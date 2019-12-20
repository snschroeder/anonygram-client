import React from 'react';
import ReactDOM from 'react-dom';
import RefreshButton from './RefreshButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RefreshButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
