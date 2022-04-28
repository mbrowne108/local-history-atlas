import React from "react";
import ReactHover, { Trigger, Hover } from "react-hover";

function MapPin({ site }) {
  const hoverOptions = {
    followCursor: false,
    shiftX: 0,
    shiftY: 0,
  }

  return (
    <div>
      <ReactHover options={hoverOptions}>
        <Trigger type="trigger">
          <div>
            <img type="button" src={require("./map_pin_filled.png")} alt="pin" />
            <p className="card" style={{width: 100 + 'px'}}><strong>{site.name}</strong></p>
          </div>
        </Trigger>
        <Hover type="hover" >
          <div className="card" style={{width: 160 + 'px'}}>
            <div className="card-header h6">{site.name}</div>
            <div className="card-body text-left">
              <p>Category: {site.category}</p>
              <p>{site.dist} miles away from you</p>
            </div>
          </div>
        </Hover>
      </ReactHover>
    </div>
  )
}

export default MapPin;