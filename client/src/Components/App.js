import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "./Login/Login.js";
import NavBar from './NavBar.js'
import Profile from "./Profile.js";
import MapContainer from "./MapView/MapContainer.js";
import ListContainer from "./ListView/ListContainer.js";
import { useSelector, useDispatch } from 'react-redux'
import { setSites } from "../Redux/actions/siteActions.js";
import { setVisits } from "../Redux/actions/visitActions.js";

function App() {
  const [user, setUser] = useState(null)
  const sites = useSelector(state => state.sites)
  const visits = useSelector(state => state.visits)
  const dispatch = useDispatch()

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
    .then(data => dispatch(setSites(data)))
  }, [visits])

  useEffect(() => {
    fetch('/visits')
    .then(r => r.json())
    .then(data => dispatch(setVisits(data)))
  }, [])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  if (!user) return <Login onLogin={setUser}/>

  return (
    <div>
      <header className="App-header">
        <div className="container rounded p-3 my-2 border bg-light text-center">
          <h1 className='display-1'>Atlas of Curiosities</h1>
          <p className="display-6 fst-italic fst-light"><small>A website dedicated to the collection and mapping of local history and lore</small></p>
        </div>
        <NavBar handleLogoutClick={handleLogoutClick}/>
        <Routes>
          <Route 
            exact path="/"
            element={
              <MapContainer user={user} sites={sites} />
            }
          />
          <Route 
            exact path="/listview"
            element={
              <ListContainer user={user} sites={sites} />
            }
          />
          <Route 
            exact path="/profile"
            element={
              <Profile user={user} />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
