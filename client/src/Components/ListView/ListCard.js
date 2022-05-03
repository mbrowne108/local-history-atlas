import React from "react";
import ListDetails from './ListDetails.js'

function ListCard({ site, user }) {
  let images = []
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
    
  return (
    <div className="col-md-2 card bg-light mt-2">
        <img className="card-img-top mx-auto d-block" src={images.length > 1 ? images[1] : images[0]} alt="Location" style={{ height: '180px', width: '186px', objectFit: 'cover' }}/>
        <div className="card-header h5">{site.name}</div>
        <div className="card-body">{site.description.substring(0,50)}...</div>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#site-details-modal-${site.id}`}>Show More</button>
        <div className='modal fade' id={`site-details-modal-${site.id}`}>
            <ListDetails site={site} images={images} user={user} />
        </div>
    </div>
  );
}

export default ListCard;