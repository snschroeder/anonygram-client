import config from '../config';
import TokenService from './token-service';

const CommentApi = {
  getComments(imageId) {
    return fetch(`${config.API_ENDPOINT}/api/comments/${imageId}`, {
    })
      .then((res) => 
        (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json()
      )
  },
  postComment(imageId, comment_text, user_id) {
    return fetch(`${config.API_ENDPOINT}/api/comments/${imageId}`, {
			method: "POST",
			headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"          
			},
			body: JSON.stringify({ comment_text, user_id })
    })
      .then((res) => {
        return (!res.ok)
          ? res.json().then((e) => Promise.reject(e))
          : res.json();
      })
      .catch(err => console.log("Error", err));
  },
}

export default CommentApi;