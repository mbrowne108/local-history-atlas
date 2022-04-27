import React from "react";
import ListDetails from './ListDetails.js'


function ListCard({ site, onNewVisit, user }) {
  let image = ""

  switch (site.category) {
      case "Food/Drink": image = require("./Placeholders/food_drink_placeholder.png")
      break;
      case "Architecture": image = require("./Placeholders/architecture_placeholder.png")
      break;
      case "Events/Stories": image = require("./Placeholders/events_stories_placeholder.png")
      break;
      case "Object": image = require("./Placeholders/object_placeholder.png")
      break;
      case "Nature": image = require("./Placeholders/nature_placeholder.png")
      break;
      default: image = require("./Placeholders/food_drink_placeholder.png")
  }
  
  return (
    <div className="col-md-2 card bg-light mt-2">
        <img className="card-img-top" src={image} alt="Food/Drink Location"/>
        <div className="card-header h5">{site.name}</div>
        <div className="card-body">{site.description.substring(0,50)}...</div>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#site-details-modal-${site.id}`}>Show More</button>
        <div className='modal fade' id={`site-details-modal-${site.id}`}>
            <ListDetails site={site} image={image} onNewVisit={onNewVisit} user={user}/>
        </div>
    </div>
  );
}

export default ListCard;