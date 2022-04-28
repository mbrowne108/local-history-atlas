import React from "react";
import { OverlayTrigger, Popover } from 'react-bootstrap';

function MapPin({ site }) {
  let totalRatings = 0
  site.visits.map((vst) => {
    return totalRatings += vst.rating
  })

  const averageRating = Math.round(totalRatings / site.visits.length)
  let starRating = ""

  for (let i = 0; i < 5; i++) {
    i < averageRating ? starRating += "★" : starRating += "☆"
  }

  const pinInfo = (
    <Popover id="popover-basic" title="Popover">
      <div className="card">
        <div className="card-header text-center h6">{site.name}</div>
        <div className="p-2">
          <small>{starRating}</small><br/>
          <small>Category: {site.category}</small><br/>
          <small>{site.dist} miles away from you</small>
        </div>
        {/* <div className="btn btn-sm btn-outline-primary">Details</div> */}
      </div>
    </Popover>
  );

  return (
    <div>
      <OverlayTrigger trigger="click" placement="top" overlay={pinInfo}>
        <div>
          <img type="button" src={require("../Assets/Icons/map_pin_filled.png")} alt="pin" />
          <p className="badge bg-primary">{site.name}</p>
        </div>
      </OverlayTrigger>
    </div>
  )
}

export default MapPin;