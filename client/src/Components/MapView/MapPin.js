import React from "react";

function MapPin({ text }) {
  return (
    <div>
      <img src={require("./map_pin.png")} alt="pin"/>
      {text}
    </div>
  )
}

export default MapPin;