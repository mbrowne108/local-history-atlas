import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

// import MapContainer from "./Maps/MapContainer";
import Login from "./Login/Login.js";
import NavBar from './NavBar.js'

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
        <h2>Main Page</h2>
        {/* <Routes>
          <Route 
            exact path="/"
            element={
              <MapContainer/>
            }
          />
        </Routes> */}
      </header>
    </div>
  );
}

export default App;
