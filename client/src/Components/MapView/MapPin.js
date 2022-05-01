import React from "react";
import { OverlayTrigger, Popover } from 'react-bootstrap';

function MapPin({ site, user }) {
  let totalRatings = 0
  let images = []

  site.visits.map((vst) => {
    return totalRatings += vst.rating
  })

  const averageRating = Math.round(totalRatings / site.visits.length)
  let starRating = ""

  for (let i = 0; i < 5; i++) {
    i < averageRating ? starRating += "★" : starRating += "☆"
  }

  switch (site.category) {
    case "Food/Drink": images.push(require("../Assets/Placeholders/food_drink_placeholder.png"))
    break;
    case "Architecture": images.push(require("../Assets/Placeholders/architecture_placeholder.png"))
    break;
    case "Events/Stories": images.push(require("../Assets/Placeholders/events_stories_placeholder.png"))
    break;
    case "Object": images.push(require("../Assets/Placeholders/object_placeholder.png"))
    break;
    case "Nature": images.push(require("../Assets/Placeholders/nature_placeholder.png"))
    break;
    default: images.push(require("../Assets/Placeholders/food_drink_placeholder.png"))
  }

  site.visits.map((visit) => {
    if (visit.image) {
      images.push(visit.image)
    }
    return images
  })

  const pinInfo = (
    <Popover id="popover-trigger-click-root-close" title="Popover">
      <div className="card">
        <div className="card-header text-center h6">{site.name}</div>
        <div className="p-2">
          <img className="card-img-top mx-auto d-block" src={images.length > 1 ? images[1] : images[0]} alt="Location" style={{ height: '100px', width: 'auto' }}/>
          {starRating}<br/>
          <small>Category: {site.category}</small><br/>
          <small>{site.dist} miles away from you</small>
        </div>
      </div>
    </Popover>
  );

  return (
    <div>
      <OverlayTrigger trigger="click" rootClose placement="top" overlay={pinInfo}>
        <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
          {site.users.some((u) => u.id === user.id) ? 
            <img type="button" src={require("../Assets/Icons/map_pin_filled.png")} alt="pin"/> :
            <img type="button" src={require("../Assets/Icons/map_pin_empty.png")} alt="pin" />
          }
          <p className="badge bg-primary">{site.name}</p>
        </div>
      </OverlayTrigger>
    </div>
  )
}

export default MapPin;