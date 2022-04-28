import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';

import SiteCard from "./SiteCard.js";
import MapPin from "./MapPin.js";
import NewSiteForm from "./NewSiteForm.js";


function MapContainer({ sites, user, onNewVisit, onDeleteVisit, onNewSite }) {
  const [mapCenter, setMapCenter] = useState({zoom: 15})
  const [filterValue, setFilterValue] = useState('')

  const filteredSites = sites.filter(site => site.category.toLowerCase().includes(filterValue.toLowerCase()))

  const sitesWithDistFrom = filteredSites.map((site) => {
    if ((mapCenter.lat === site.lat) && (mapCenter.lng === site.lng)) {
      return 0
    } else {
      let radlat1 = Math.PI * mapCenter.lat/180;
      let radlat2 = Math.PI * site.lat/180;
      let theta = mapCenter.lng-site.lng;
      let radtheta = Math.PI * theta/180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return {...site, dist: Math.round(dist * 100) / 100}
    }
  }).sort((a, b) => a.dist - b.dist)

  function handleCategoryChange(e) {
    setFilterValue(e.target.value)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const info = {lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 15}
      setMapCenter(info)
    })
  }, [])
  
  // function getUserCoords() {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     const info = {lat: pos.coords.latitude, lng: pos.coords.longitude, zoom: 15}
  //     setMapCenter(info)
  //   })
  // }

  const handleApiLoaded = (map, maps) => {
    let boundsData = map.getBounds()
    let norEast = boundsData.getNorthEast()
    let souWest = boundsData.getSouthWest()
    let norWest = new maps.LatLng(norEast.lat(), souWest.lng())
    let souEast = new maps.LatLng(souWest.lat(), norEast.lng())

    let bounds = {NE: norEast, NW: norWest, SE: souEast, SW: souWest}
  };
  
  return (
    <div className="row m-3">
      <div className="container col-6 text-center" style={{ height: '540px', width: '960px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          center={{lat: mapCenter.lat, lng: mapCenter.lng}}
          zoom={mapCenter.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {sitesWithDistFrom.map(site => 
            <MapPin 
              key={site.id}
              lat={site.lat} 
              lng={site.lng} 
              site={site}
            />
          )}
        </GoogleMapReact>
      </div>
      <div className="container col-5">
            <select className="form-select col mt-2 mb-2 mr-auto ml-auto" onChange={handleCategoryChange}>
                <option value=''>Filter by category...</option>
                <option value='Architecture'>Architecture</option>
                <option value='Events/Stories'>Events/Stories</option>
                <option value='Object'>Object</option>
                <option value='Food/Drink'>Food/Drink</option>
                <option value='Nature'>Nature</option>
            </select>
            <div className="list-group d-grid">
                {sitesWithDistFrom.map(site => 
                  <SiteCard 
                    key={site.id} 
                    site={site} 
                    user={user} 
                    onNewVisit={onNewVisit} 
                    onDeleteVisit={onDeleteVisit} 
                  />)
                }
                <div className="card btn btn-lg btn-outline-primary" data-bs-toggle="modal" data-bs-target='#new-site-modal'>
                  <p className="h3 justify-content-center" ><strong>+</strong></p>
                </div>
            </div>
            <div className='modal fade' id='new-site-modal'>
              <NewSiteForm user={user} onNewSite={onNewSite}/>
            </div>
        </div>
    </div>
  );
}

export default MapContainer;
