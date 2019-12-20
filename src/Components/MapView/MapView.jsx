import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import ImageApi from '../../services/image-api-service';
import config from '../../config';

function MapView(props) {

  const { userLocation, setView, setStateImages, newContentLoaded, updateNewContent } = props;
  const { lat, long } = userLocation;

  const [imageFeed, setImageFeed] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [zoomState, setZoomState] = useState(12);

  const zoomBoundaries = { min: 12, max: 14 };

  let holderZoom = zoomState;

  useEffect(() => {
    setLoading(true);
    ImageApi.getMapImages('new', lat, long)
      .then((res) => {
        setImageFeed(res);
        setStateImages(res);
        setLoading(false);
      })
  }, [lat, long, setStateImages]);

  useEffect(() => {
    window.addEventListener('wheel', wheelHandler);
    window.addEventListener('touchmove', pinchHandler);
    setView('map');
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      window.removeEventListener('touchmove', pinchHandler);
    }
  }, []);

  const wheelHandler = (e) => {
    if (e.deltaY > 0) {
      setTimeout(() => {
        if (holderZoom - 1 >= zoomBoundaries.min) {
          setZoomState(zoomState => zoomState -= 1);
          holderZoom -= 1;
        }
      }, 100);

    } else if (e.deltaY < 0) {
      setTimeout(() => {
        if (holderZoom + 1 <= zoomBoundaries.max) {
          setZoomState(zoomState => zoomState += 1);
          holderZoom += 1;
        }
      }, 100);
    }
  };

  const pinchHandler = (e) => {
    if (e.targetTouches.length === 2) {
      let point1 = e.targetTouches[0];
      let point2 = e.targetTouches[1];
      
      let sqrVectorDistance = Math.pow(point1.clientX - point2.clientX, 2) + Math.pow(point1.clientY - point2.clientY, 2);
      // console.log(sqrVectorDistance);
      if (sqrVectorDistance > 50000) { // zoom out
        if (holderZoom + 1 <= zoomBoundaries.max) {
          setZoomState(zoomState => zoomState += 1);
          holderZoom += 1;
        }
      }
      else {
        if (holderZoom - 1 >= zoomBoundaries.min) {
          setZoomState(zoomState => zoomState -= 1);
          holderZoom -= 1;
        }
      }
    }
  };

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const handleMarkerClick = (id) => {
    props.history.push(`/p/${id}`)
  };

  const truncateCoord = (coord) => {
    coord.toString();
    let decimal = coord.indexOf('.');
    return Number(coord.slice(0, (decimal + 4)))
  };

  const generateMarkers = () => {
    let positions = imageFeed.map((point) => {
      const lat = truncateCoord(point.latitude);
      const long = truncateCoord(point.longitude);
      return { lat, long, img: point.image_url, karma: point.karma_total, id: point.id, zoomLevel: 12 }
    });

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (Math.abs(positions[i].lat - positions[j].lat) <= 0.01 && Math.abs(positions[i].long - positions[j].long <= 0.01)) {
          positions[j].zoomLevel = 13;
        } else if (Math.abs(positions[i].lat - positions[j].lat) <= 0.008 && Math.abs(positions[i].long - positions[j].long <= 0.008)) {
          positions[j].zoomLevel = 14;
        }
      }
    }

    let jsx = positions.map((point) => {
      if (zoomState >= point.zoomLevel) {
        let scale = 55;
        if (zoomState === 13) {
          scale = 65;
        }
        if (zoomState >= 14) {
          scale = 85;
        }

        return (
            <Marker
              key={point.id}
              icon={{ url: point.img, scaledSize: new props.google.maps.Size(scale, scale) }}
              position={{ lat: point.lat, lng: point.long }}
              onClick={() => handleMarkerClick(point.id)}
            />
        )
      }
    })
    return jsx;
  };

  return (
    <>
      <Map
        google={props.google}
        zoom={zoomState}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: long }}
        defaultOptions={{ draggable: false }}
        disableDefaultUI={true}
        gestureHandling="none"
        zoomControl={false}
      >
        {generateMarkers()}
      </Map>
      <SubmissionForm
        userLocation={userLocation}
        newContentLoaded={newContentLoaded}
        updateNewContent={updateNewContent}
      />
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: config.REACT_APP_MAP_API_KEY
})(MapView);
