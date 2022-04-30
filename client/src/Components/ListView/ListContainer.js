import React, { useState } from "react";
import ListCard from './ListCard.js'
import NewSiteForm from "../MapView/NewSiteForm.js";

function ListContainer({ sites, user, onNewVisit, onNewSite, onDeleteVisit, onUpdateVisit }) {
  const [filterValue, setFilterValue] = useState('')
  const filteredSites = sites.filter(site => site.category.toLowerCase().includes(filterValue.toLowerCase()))

  function handleCategoryChange(e) {
    setFilterValue(e.target.value)
  }

  return (
    <div className="container">
      <select className="form-select col-5 mt-2 mr-auto ml-auto" onChange={handleCategoryChange}>
        <option value=''>Filter by category...</option>
        <option value='Architecture'>Architecture</option>
        <option value='Events/Stories'>Events/Stories</option>
        <option value='Object'>Object</option>
        <option value='Food/Drink'>Food/Drink</option>
        <option value='Nature'>Nature</option>
      </select>
      <div className="row">
        {filteredSites.map((site) => <ListCard key={site.id} site={site} onNewVisit={onNewVisit} onDeleteVisit={onDeleteVisit} user={user} onUpdateVisit={onUpdateVisit} />)}
        <div className="col-md-2 card mt-2 btn btn-outline-primary" data-bs-toggle="modal" data-bs-target='#new-site-modal'>
          <h1 className="display-1 card-body d-flex align-items-center justify-content-center" ><strong>+</strong></h1>
        </div>
        <div className='modal fade' id='new-site-modal'>
          <NewSiteForm user={user} onNewSite={onNewSite}/>
        </div>
      </div>
    </div>
  );
}

export default ListContainer;
