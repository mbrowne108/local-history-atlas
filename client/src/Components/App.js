import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "./Login/Login.js";
import NavBar from './NavBar.js'
import ProfileContainer from "./Profile/ProfileContainer.js";
import MapContainer from "./MapView/MapContainer.js";
import ListContainer from "./ListView/ListContainer.js";

function App() {
  const [user, setUser] = useState(null)
  const [sites, setSites] = useState([])
  const [visits, setVisits] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [visits])

  useEffect(() => {
    fetch('/sites')
    .then(r => r.json())
    .then(data => setSites(data))
  }, [visits])

  useEffect(() => {
    fetch('/visits')
    .then(r => r.json())
    .then(data => setVisits(data))
  }, [])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  function onNewVisit(newVisit) {
    const newVisitArray = [...visits, newVisit]
    setVisits(newVisitArray)
  }

  function onDeleteVisit(deletedVisit) {
    const updatedVisits = visits.filter((visit) => visit.id !== deletedVisit.id)
    setVisits(updatedVisits)
  }

  function onNewSite(newSite) {
    const newSiteArray = [...sites, newSite]
    setSites(newSiteArray)
  }

  if (!user) return <Login onLogin={setUser}/>

  return (
    <div>
      <header className="App-header">
        <h1 className='container rounded p-3 my-2 border bg-light display-1 text-center'>Local History Atlas</h1>
        <NavBar handleLogoutClick={handleLogoutClick}/>
        <Routes>
          <Route 
            exact path="/"
            element={
              <MapContainer user={user} sites={sites} onNewVisit={onNewVisit} onDeleteVisit={onDeleteVisit} onNewSite={onNewSite} />
            }
          />
          <Route 
            exact path="/listview"
            element={
              <ListContainer user={user} sites={sites} onNewVisit={onNewVisit} onNewSite={onNewSite}/>
            }
          />
          <Route 
            exact path="/profile"
            element={
              <ProfileContainer user={user}/>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
