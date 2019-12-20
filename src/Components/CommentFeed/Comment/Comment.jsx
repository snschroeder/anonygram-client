import React from 'react';
import './Comment.css';

export default function Comment (props) {
  const { username, text, timestamp } = props;

  return (
    <div className='Comment'>
      <div className='Comment__div mainContainer'>
        <p className='Comment__p'><span className='Comment__span username bold'>{username}</span>{text}</p>
      </div>
      <div className='Comment__div timestamp italic'>{timestamp}</div>
    </div>
  )
}

