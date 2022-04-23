import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import Login from "./Login/Login.js";
import NavBar from './NavBar.js'
import ProfileContainer from "./Profile/ProfileContainer.js";
import MapContainer from "./MapView/MapContainer.js";
import ListContainer from "./ListView/ListContainer.js";



function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
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
        <h1 className='container rounded p-3 my-2 border bg-light display-1 text-center'>Local History Atlas</h1>
        <NavBar handleLogoutClick={handleLogoutClick}/>
        <Routes>
          <Route 
            exact path="/"
            element={
              <MapContainer/>
            }
          />
          <Route 
            exact path="/listview"
            element={
              <ListContainer/>
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
