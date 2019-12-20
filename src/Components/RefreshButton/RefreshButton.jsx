import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

import './RefreshButton.css';

export default function RefreshButton (props) {
  const { handleGeolocation } = props;

  return (
    <div>
      <button onClick={() => handleGeolocation()} className='RefreshButton resetStyles'>
        {props.screen === 'mobile' ? (
          <RefreshIcon />
        ) : (
          'Refresh Feed'
        )}
      </button>
    </div>
  );
};