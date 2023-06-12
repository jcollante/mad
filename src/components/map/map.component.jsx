import "./map-style.css";
import React, { useContext, useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  LayersControl,
} from "react-leaflet";
import Ports from "./ports/ports.component";
import Vessels from "./vessels/vessels.component";
import DrawControl from "./drawcontrol/drawcontrol.component";
import TimeControl from "./timecontrol/timecontrol.component";
import Path2 from "./path/path2.component";
import SideBar from "./sidebar/sidebar.component";

import { VesselContext } from "../../contexts/vessel.context";

export const Map = () => {
  const { currentVessel } = useContext(VesselContext);
  const { currentTime } = useContext(VesselContext);
  const { setUrlServer } = useContext(VesselContext);
  // timeInterval: "2022-03-13T22:00:00.000Z/2022-03-14T10:00:00.000Z",
  const timeDimensionOptions = {
    timeInterval: "2022-02-02T17:00:00.000Z/2022-03-02T23:00:00.000Z",
    period: "PT1M",
    currentTime: currentTime, //Date.parse("2022-03-15"),
    autoPlay: false,
    minSpeed: 1,
    speedStep: 1,
    maxSpeed: 15,
    timeSliderDragUpdate: true,
  };

  const onSearchChange = (event) => {
    const searchFieldStr = event.target.value;
    setUrlServer(searchFieldStr);
  };

  return (
    <>
      <div className="title-wrapper">
        <div className="header-temp">
          <div>
            <div className="header-temp">
              <img className="img-deloitte" src="./deloitte.png" alt="" />
            </div>
            <div className="header-temp">
              <b>Maritime Anomaly Detection</b>
            </div>
          </div>
        </div>
        <div className="header-temp">
          <input placeholder="URL to backend" onChange={onSearchChange} />
        </div>
        <div className="header-temp">Selected Vessel: {currentVessel.MMSI}</div>
      </div>
      <MapContainer
        center={[53.0902, 7.7129]}
        zoom={7}
        scrollWheelZoom={true}
        timeDimension
        timeDimensionOptions={timeDimensionOptions}
        timeDimensionControl
        preferCanvas={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">DELOITTE</a> contributors '
          className="sidebar"
        />
        <DrawControl />

        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Ports">
            <FeatureGroup>
              <Ports />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Vessels">
            <FeatureGroup>
              <Vessels />
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Vessel Path">
            <FeatureGroup>
              <Path2 />
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <TimeControl />
      </MapContainer>
      <SideBar></SideBar>
    </>
  );
};

export default Map;
