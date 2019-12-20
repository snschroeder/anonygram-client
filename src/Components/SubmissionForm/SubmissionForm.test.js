import React from 'react';
import ReactDOM from 'react-dom';
import SubmissionForm from './SubmissionForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubmissionForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
