import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Comment component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Comment />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders elements by default', () => {
    const wrapper = shallow(<Comment />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders elements given props', () => {
    const props = {
      timestamp: 'in 5 hours',
      username: 'test username',
      key: '2d644486-26dc-4ad3-b460-3c6895aa260f',
      text: 'some comment text',
    };
    const wrapper = shallow(<Comment {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
