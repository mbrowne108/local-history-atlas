import React from "react";
import NewVisitForm from "./NewVisitForm.js";

function SiteCard({ site, user, onNewVisit, onDeleteVisit }) {
  let totalRatings = 0
  site.visits.map((vst) => {
    return totalRatings += vst.rating
  })

  const averageRating = Math.round(totalRatings / site.visits.length)
  let starRating = ""

  for (let i = 0; i < 5; i++) {
    i < averageRating ? starRating += "★" : starRating += "☆"
  }


  const userVisits = user.sites.map((vst) => {
    if (vst.id === site.id) {
      return vst.id
    } else {
      return null
    }
  })

  function handleDelete() {
    const visit = site.visits.find(vst => vst.user.id === user.id)
    const result = window.confirm(`Are you sure you want to delete this visit?`)
    if (result) {
        fetch(`/visits/${visit.id}`, {
            method: "DELETE",
        })
            .then(r => r.json())
            .then(() => onDeleteVisit(visit))
    }
  }

  return (
    <div>
      <div className="list-group-item list-group-item-action row">
        <h6 className="d-inline-block col-11">{site.name} <small>{averageRating || averageRating === 0 ? starRating : null} <small>{site.dist} miles away </small></small></h6>
        {userVisits.includes(site.id) ? 
          <button className="btn btn-sm btn-outline-secondary col-1 p-1" onClick={handleDelete}> <img src={require("../Assets/Icons/map_pin_filled.png")} alt="pin_filled"/></button> :
          <button className="btn btn-sm btn-outline-secondary col-1 p-1" data-bs-toggle="modal" data-bs-target={`#new-visit-modal-${site.id}`}> <img src={require("../Assets/Icons/map_pin_empty.png")} alt="pin_empty"/></button>
        }
      </div>
      <div className='modal fade' id={`new-visit-modal-${site.id}`}>
        <NewVisitForm site={site} user={user} onNewVisit={onNewVisit}/>
      </div>
    </div>
  );
}

export default SiteCard;