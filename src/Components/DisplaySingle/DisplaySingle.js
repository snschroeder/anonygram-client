import React, { Component } from 'react';
import moment from 'moment';
import CommentFeed from '../CommentFeed/CommentFeed';
import CommentApi from '../../services/comment-api-service';
import ImageContext from '../../contexts/ImageContext';
import TokenService from '../../services/token-service';
import { KeyboardArrowUp } from '@material-ui/icons';
import './DisplaySingle.css';

export default class DisplaySingle extends Component {
  static contextType = ImageContext; 
  
  state = {
    image: {}, 
    comments: [], 
    loading: false, 
  }

  convertTime = (timestamp) => {
    return moment((new Date(timestamp)).toString()).fromNow();
  }

  componentDidMount = () => {
    // scroll immediately to top-left when component renders
    window.scrollTo(0, 0);

    const submissionId = this.props.submissionId;
    const image = this.context.images.find(img => img.id === Number(submissionId));

    this.setState({ loading: true });
    CommentApi.getComments(submissionId)
      .then((res) => {
        this.setState({
          image,
          comments: res,
          loading: false,
        })
      });
  }

  setCommentsByPush = (comment) => {
    const commentsArr = this.state.comments.map(c => c);
    commentsArr.push(comment);
    this.setState({ comments: commentsArr })
  } 

  render = () => {
    const userLoggedIn = TokenService.hasAuthToken();
    const userIDFromToken = TokenService.parseAuthToken() !== undefined ? TokenService.parseAuthToken().id : ''; 

    //This conditional is needed to keep componentDidMount in CommentFeed from running before the needed props are ready to be passed in (to generate usernames)
    if (this.state.comments == null) {
      return null;
    }
    if (this.state.loading === true) {
      return (
        <div className='loader-container'>
          <div className="loader"></div>
        </div>
      )
    } else {
      const { id, image_url, image_text, create_timestamp, karma_total, user_id } = this.state.image
      return (
        <div className='DisplaySingle'>
          <img className='single-image' src={image_url} alt={image_text}/>
          { /* If user is logged in, render enabled upvote button */
          userLoggedIn && userIDFromToken !== user_id  ? (
            <div className='upvote-wrapper' onClick={() => this.context.incrementUpvotes(id)}>
              <div className="upvote-button">
               <KeyboardArrowUp fontSize="large"/>
               <p className="upvote-count">{karma_total}</p>
              </div>
            </div>
          ) : (
            <div className='upvote-wrapper'>
              <div className="upvote-button-no-auth">
               <p className="upvote-count">{karma_total}</p>
              </div>
            </div>
          )}
          <div className='timestamp-display'>{this.convertTime(create_timestamp)}</div>

          <p>{image_text}</p>
          <CommentFeed id={this.state.image.id} comments={this.state.comments} setCommentsByPush={this.setCommentsByPush} userLoggedIn={userLoggedIn}/>
        </div>
      )
    }
  }
}