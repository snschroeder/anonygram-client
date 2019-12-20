import React from 'react';
import ReactDOM from 'react-dom';
import DisplayFeed from './DisplayFeed';
import * as ImageContext from '../../contexts/ImageContext';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DisplayFeed component', () => {
  const contextValues = {
    images: [
      {
        id: 20,
        image_url:
          'https://lh3.googleusercontent.com/p/AF1QipMJcAXkTwnOj_TWYbMRwygy8ktducIF2kgOqSdW=s1600-w500',
        image_text: null,
        karma_total: 0,
        latitude: '29.65468429999999',
        longitude: '-82.4158946',
        create_timestamp: '2019-12-10T00:40:55.725Z',
      },
      {
        id: 21,
        image_url:
          'https://lh3.googleusercontent.com/p/AF1QipMJcAXkTwnOj_TWYbMRwygy8ktducIF2kgOqSdW=s1600-w500',
        image_text: 'some optional text',
        karma_total: 0,
        latitude: '29.65468429999999',
        longitude: '-82.4158946',
        create_timestamp: '2019-12-11T00:40:55.725Z',
      },
    ],
    incrementUpvotes: () => contextValues.images[0].karma_total += 1,
  };
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DisplayFeed />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders elements by default', () => {
    const wrapper = shallow(<DisplayFeed />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('renders elements given ImageContext', async () => {
    jest
      .spyOn(ImageContext, 'useImageContext')
      .mockImplementation(() => contextValues);
    const wrapper = await shallow(<DisplayFeed />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('clicking upvote updates prop value as expected', () => {
    const context = {...contextValues}
    jest
      .spyOn(ImageContext, 'useImageContext')
      .mockImplementation(() => contextValues);
      const wrapper = shallow(<DisplayFeed />, { context })
      // "click" it twice
      contextValues.images[0].karma_total = wrapper.find('DisplayItem').at(0).props().incrementUpvotes()
      contextValues.images[0].karma_total = wrapper.find('DisplayItem').at(0).props().incrementUpvotes()
      wrapper.setContext(contextValues)
      expect(toJson(wrapper)).toMatchSnapshot();
  })
});
