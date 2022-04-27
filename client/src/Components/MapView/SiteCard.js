import React from "react";
import NewVisitForm from "./NewVisitForm.js";

function SiteCard({ site, user, onNewVisit, onDeleteVisit }) {
  let totalRatings = 0
  site.visits.map((vst) => {
    return totalRatings += vst.rating
  })
  const averageRating = Math.round((totalRatings / site.visits.length) * 100 / 100)

  const userVisits = user.sites.map((vst) => {
    if (vst.id === site.id) {
      return vst.id
    } else {
      return null
    }
  })

  function handleDelete() {
    const visit = site.visits.find(vst => vst.user.id === user.id)
    console.log(visit)
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
    <div >
      <div className="list-group-item list-group-item-action">
        <h5 className="d-inline-block">{site.name} <small>{averageRating || averageRating === 0 ? `${averageRating} stars` : null} <small>{site.dist} miles away </small></small></h5>
        {userVisits.includes(site.id) ? 
          <button className="btn btn-outline-secondary float-right" onClick={handleDelete}> 🗹</button> :
          <button className="btn btn-outline-secondary float-right" data-bs-toggle="modal" data-bs-target={`#new-visit-modal-${site.id}`}> ☐</button>
        }
        <p className="float-right"> </p>
      </div>
      <div className='modal fade' id={`new-visit-modal-${site.id}`}>
        <NewVisitForm site={site} user={user} onNewVisit={onNewVisit}/>
      </div>
    </div>
  );
}

export default SiteCard;