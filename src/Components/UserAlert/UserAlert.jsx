import React from 'react';
import { useImageContext } from '../../contexts/ImageContext';
import './UserAlert.css';

export default function UserAlert() {

  const context = useImageContext();

  const { alert } = context;

  return (
    <>
    {alert && 
    <div className="notifications-container">
      <p className="message">{alert}</p>
      </div>}
    </>
  )
}
