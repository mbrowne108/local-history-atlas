import React from "react";
import GoogleMapReact from 'google-map-react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Profile({ user }) {
  const visits = user.visits
  const profileCreateDate = new Date(user.created_at)

  return (
    <div className="row">
      <div className="card col-md-6">
        <div className="card-header">
          <h2>{user.username}'s Profile</h2>
          <h5>Member since {profileCreateDate.toLocaleDateString()}</h5>
        </div>
        <div className="card-body">
          <h6 className="display-6 text-center">Places Visited: {user.visits.length}</h6>
          <ul className="list-group col-md">
            {visits.map(visit => {
              const timestamp = new Date(visit.created_at).toLocaleString()
              let starRating = ''
              for (let i = 0; i < 5; i++) {
                      i < visit.rating ? starRating += "★" : starRating += "☆"
              }
              return <li key={visit.id} className="list-group-item list-group-item-primary"><b>{visit.site.name} <small>{timestamp}</small></b><br/>Comment: {visit.comment}<br/>Rating: {starRating}</li>
            })}
          </ul>
        </div>
      </div>
      <div className="col-md-6" style={{ height: '540px', width: '960px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={{lat: 39.8283, lng: -98.5795}}
          zoom={4.3}
        >
          {user.sites.map(site => 
            <OverlayTrigger 
              key={site.id}
              lat={site.lat}
              lng={site.lng}
              delay={{ show: 50, hide: 300 }}
              overlay={
                <Tooltip id="tooltip">
                  <p className="badge bg-primary">{site.name}</p>
                </Tooltip>
              }
            >
              <img type="button" src={require("./Assets/Icons/map_pin_filled.png")} alt="pin" style={{ position: "absolute", transform: "translate(-50%, -50%)" }} />
            </OverlayTrigger>
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Profile;
