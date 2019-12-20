import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './MapView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapView />, div);
  ReactDOM.unmountComponentAtNode(div);
});
