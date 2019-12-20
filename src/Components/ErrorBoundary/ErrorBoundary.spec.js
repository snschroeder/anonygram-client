import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

// set up as placeholder
function ProblemChild() {
  // throw new Error('Error thrown from problem child');
  return <div>Error</div>;
}

describe('ErrorBoundary component', () => {
  it('correctly renders the ErrorBoundary when an error is present', () => {
    const wrapper = mount(<ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>);
    const error = 'hi!';
    wrapper.find(ProblemChild).simulateError(error);
    expect(wrapper.state().hasError)
  })
})