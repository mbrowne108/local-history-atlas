import React from "react";
import GoogleMapReact from 'google-map-react';


function ProfileContainer({ user }) {
  const visits = user.visits
  const profileCreateDate = new Date(user.created_at)

  const handleApiLoaded = (map, maps) => {
  };

  return (
    <div className="row">
      <div className="card col-6">
        <div className="card-header">
          <h2>{user.username}'s Profile</h2>
          <h5>Member since {profileCreateDate.toLocaleDateString()}</h5>
        </div>
        <div className="card-body">
          <h6>Places Visited: {user.visits.length}</h6>
          <ul className="list-group col-8">
            {visits.map(visit => {
              const timestamp = new Date(visit.created_at).toLocaleString()
              return <li key={visit.id} className="list-group-item"><b>{visit.site.name} <small>{timestamp}</small></b><br/>Comment: {visit.comment}<br/><em>Rating: {visit.rating}/5</em></li>
            })}
          </ul>
        </div>
      </div>
      <div className="col-6" style={{ height: '540px', width: '960px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={{lat: 39.8283, lng: -98.5795}}
          zoom={4.3}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {user.sites.map(site => 
            <div id={site.id} lat={site.lat} lng={site.lng}>
              <img type="button" src={require("../Assets/Icons/map_pin_filled.png")} alt="pin" />
              {/* <p className="badge bg-primary">{site.name}</p> */}
            </div>
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default ProfileContainer;
