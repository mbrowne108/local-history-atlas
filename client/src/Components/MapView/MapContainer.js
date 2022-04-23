import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ pin, text }) => {
  return (
    <div>
      <img src="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" alt="pin"/>
      {text}
    </div>
  )
}
function MapContainer() {

  return (
    <div className="container" style={{ height: '720px', width: '1280px' }}>
      <h2>Map View</h2>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={{lat: 40.7338222, lng: -73.9800689}}
          defaultZoom={15}
        >
          <AnyReactComponent
            lat={40.7338222}
            lng={-73.9800689}
            text="Home"
          />
        </GoogleMapReact>
    </div>
  );
}

export default MapContainer;
