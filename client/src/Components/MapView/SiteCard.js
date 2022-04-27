import React from "react";
import NewVisitForm from "./NewVisitForm.js";

function SiteCard({ site, mapCenter, user, onNewVisit, onDeleteVisit }) {
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

  function distance(lat1, lng1, lat2, lng2) {
    if ((lat1 === lat2) && (lng1 === lng2)) {
      return 0
    } else {
      let radlat1 = Math.PI * lat1/180;
      let radlat2 = Math.PI * lat2/180;
      let theta = lng1-lng2;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return Math.round(dist * 100) / 100
    }
  }

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
        <h5 className="d-inline-block">{site.name} <small>{averageRating || averageRating === 0 ? `${averageRating} stars` : null} <small>{distance(site.lat, site.lng, mapCenter.lat, mapCenter.lng)} miles away </small></small></h5>
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