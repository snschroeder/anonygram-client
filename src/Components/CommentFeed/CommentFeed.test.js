import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommentFeed from './CommentFeed';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('CommendFeed component', () => {
  CommentFeed.contextTypes = {
    user: PropTypes.object,
  };
  const context = {
    user: {
      id: 'b709597c-bfbd-498c-9daa-da18556afcb9',
    },
  };
  const props = {
    id: '4d8a8589-1c1d-48e8-97fa-f2cee900e1cf',
    comments: [
      {
        comment_timestamp: new Date(),
        user_id: '1',
        comment_id: '56532f9e-8022-4759-b134-b7269d510689',
        comment_text: 'comment text 1',
      },
    ],
    setCommentsByPush: () => {},
  };
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <CommentFeed />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders elements by default', () => {
    const wrapper = shallow(<CommentFeed />, { context });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders elements given props', () => {
    const wrapper = shallow(<CommentFeed {...props} />, { context });
    wrapper.setState({
      usernames: {
        '1': 'ObtuseRubberGoose'
      } 
    })
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('obscures usernames when multiple comments present', () => {
    const propsWithComments = {
      id: '4d8a8589-1c1d-48e8-97fa-f2cee900e1cf',
      comments: [
        {
          comment_timestamp: new Date(),
          user_id: '1',
          comment_id: '56532f9e-8022-4759-b134-b7269d510689',
          comment_text: 'comment text 1',
        },
        {
          comment_timestamp: new Date(),
          user_id: '2',
          comment_id: '56532f9e-8022-4759-b134-b7269d510689',
          comment_text: 'comment text 1',
        },
      ],
      setCommentsByPush: () => {},
    };
    const wrapper = shallow(<CommentFeed {...propsWithComments} />, {
      context,
    });
    const user1 = wrapper.childAt(0).props().username;
    const user2 = wrapper.childAt(1).props().username;
    expect(user1 === user2).toEqual(false);
  });
});
