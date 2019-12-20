import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randomizer from '../../helpers/randomizer';
import Comment from './Comment/Comment';
import CommentApi from '../../services/comment-api-service';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './CommentFeed.css';

import moment from 'moment';

export default class CommentFeed extends Component {
  state = {
    usernames: {},
    newComment: '',
  }
  
  static contextType = UserContext;

  static defaultProps = {
    comments: []
  }

  processTimestamp(timestamp) {
    return moment(new Date(timestamp)).local().fromNow();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const commentText = this.state.newComment; 
    const { id } = TokenService.parseAuthToken()
    CommentApi.postComment(this.props.id, commentText, id)
      .then(res => {
        this.props.setCommentsByPush(res);
        //If first post by this user, a username will need to be generated for them
        if (!this.state.usernames[id]) {
          const newUn = this.generateUsernames([res]);
          const newUsernames = {...this.state.usernames, ...newUn}
          this.setState({ usernames: newUsernames, newComment: '' })
        } else {
          this.setState({ newComment: '' })
        }
      })
  }

  handleChange = (e) => {
    this.setState({newComment: e.target.value})
  }

  componentDidMount() {
    if (this.props.comments.length > 0) {
      const newUsernames = this.generateUsernames(this.props.comments)
      this.setState({ usernames: newUsernames });
    }
  };

  generateUsernames = (comments) => {
    return randomizer.getAnonUsernames(comments);
  }

  render() {
    const { comments, userLoggedIn } = this.props;

    //If you're posting the first comment, then generateUsernames didn't run on mount. Run it here. 
    //ComponentDidMount edited to be >1 so that generateUsernames doesn't run twice if there is one 
    //comment to begin with
    // (this.props.comments.length === 1 && (Object.keys(this.state.usernames).length === 0)) && this.generateUsernames(this.props.comments);

    return (
      <div className='comment-container'>
        {(comments.length === 0) 
          ? null
          : (
            comments.map(commentObj => {
              const { comment_timestamp, user_id, comment_id, comment_text } = commentObj;
    
              return <Comment key={comment_id} text={comment_text} username={this.state.usernames[user_id]} timestamp={this.processTimestamp(comment_timestamp)} />;
            })
          )
        }
        <form onSubmit={(e) => this.handleSubmit(e)} className='CommentFeed__form'>
          {/* <label htmlFor='newComment'>Add a Comment</label> */}
          { //Conditionally render for logged in user
            userLoggedIn ? (
              <>
                <input className='CommentFeed__input' onChange={(e) => this.handleChange(e)} value={this.state.newComment} type='text' id='newComment' placeholder='Add a comment...' />
                <button type='submit' className='CommentFeed__button' disabled={!this.state.newComment}>Post</button>
              </>
            ) : (
              <>
                <label htmlFor='newComment'>You must be logged in to post a comment. Log in <Link to='/login'>here</Link>.</label>
                <input type='text' id='newComment' className='CommentFeed__input' placeholder='' disabled />
                <button type='submit' className='CommentFeed__button' disabled>Post</button>
              </>
            )
          }
        </form>
      </div>
    )
  }
}

