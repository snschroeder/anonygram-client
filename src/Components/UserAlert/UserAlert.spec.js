import React from 'react';
import ReactDOM from 'react-dom';
import UserAlert from './UserAlert';
import * as ImageContext from '../../contexts/ImageContext'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('UserAlert component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserAlert />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders alert when set in context', () => {
    const contextValues = {
      alert: 'Alert!'
    }
    jest
      .spyOn(ImageContext, 'useImageContext')
      .mockImplementation(() => contextValues)
    const wrapper = shallow(<UserAlert/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
