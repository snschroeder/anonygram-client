import React, { useContext } from "react";
import { Link } from 'react-router-dom';

//icons
import MapIcon from '@material-ui/icons/Map';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { ThumbUp } from '@material-ui/icons';
import InfoIcon from '@material-ui/icons/Info';

import NavBar from '../NavBar/NavBar';
import RefreshButton from '../RefreshButton/RefreshButton';

import UserContext from '../../contexts/UserContext';
import TokenService from "../../services/token-service";
import "./OptionsBar.css";



export default function OptionsBar(props) {
  const context = useContext(UserContext);
	const { screen, view } = props;
	if (screen === 'mobile' ) {
		return (
			<div className='OptionsBar mobile'>
				{/* Render karma count if logged in */
					TokenService.hasAuthToken() && (
						<div className="App__karma-total">
							<ThumbUp />{' '} 
							{context.user.karma_balance}
						</div>
					)
				}
				{/* Conditionally render button for map/feed view */}
				{(view === "feed") ? (
					<Link to='/local-map' className='resetStyles'>
						<MapIcon />
					</Link>
				) : (
					<Link to='/' className='resetStyles'>
						<DynamicFeedIcon />
					</Link>
				)}
		
				<RefreshButton screen={screen} handleGeolocation={props.handleGeolocation}/>
				
				

				<Link to='/info' className='resetStyles'>
					<InfoIcon />
				</Link>
				
				<section className="floater">
				  <NavBar setSort={props.setSort} />
				</section>
			</div>
		)
	} else {
		return (
			<div className='OptionsBar desktop'>
				{/* Render karma count if logged in */
					TokenService.hasAuthToken() && (
						<div className="App__karma-total">
							Karma Count:{' '}
							{context.user.karma_balance}
						</div>
					)
				}

				{/* Conditionally render button for map/feed view */}
				{(view === "feed") ? (
					<Link to='/local-map' className='resetStyles'>
						Map View
					</Link>
				) : (
					<Link to='/' className='resetStyles'>
						Feed View
					</Link>
				)}
		
				<RefreshButton screen={screen} handleGeolocation={props.handleGeolocation}/>
				<Link to='/info' className='resetStyles'>About</Link>
				<section className="floater">
				  <NavBar setSort={props.setSort} />
				</section>
				

				
			</div>
		)
	}
}
