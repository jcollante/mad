import "./sidebar-style.css";
import "./table-style.css";
import React, { Component, useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, useMap } from "react-leaflet";
import { Sidebar, Tab } from "./sidebar.component";
import { VesselContext } from "../../../contexts/vessel.context";

const SidebarMain = () => {
  const [state, setState] = useState({
    collapsed: true,
    selected: "home",
  });

  const { currentVessel } = useContext(VesselContext);

  const onClose = () => {
    setState({ collapsed: true });
  };
  const onOpen = (id) => {
    setState({
      collapsed: false,
      selected: id,
    });
  };

  return (
    <div className="hej">
      <Sidebar
        id="sidebar"
        collapsed={state.collapsed}
        selected={state.selected}
        onOpen={onOpen}
        onClose={onClose}
        closeIcon
      >
        <Tab id="home" header=" " icon="fa fa-home">
          <b>Vessel Information</b>
          <div>
            <img className="vessel-img" src={`${currentVessel.Image}`}></img>
          </div>

          <div>
            <table class="tparams">
              <tbody>
                <tr>
                  <td class="n3">MMSI number</td>
                  <td class="v3">{currentVessel.MMSI}</td>
                </tr>
                <tr>
                  <td class="n3">Vessel Name</td>
                  <td class="v3">{currentVessel.VesselName}</td>
                </tr>
                <tr>
                  <td class="n3">Vessel type</td>
                  <td class="v3">{currentVessel.CallSign}</td>
                </tr>
                <tr>
                  <td class="n3">Call Sign</td>
                  <td class="v3">{currentVessel.VesselType}</td>
                </tr>
                <tr>
                  <td class="n3">Length Overall (m)</td>
                  <td class="v3">{currentVessel.Length}</td>
                </tr>
                <tr>
                  <td class="n3">Width Overall (m)</td>
                  <td class="v3">{currentVessel.Width}</td>
                </tr>
                <tr>
                  <td class="n3">Latitude</td>
                  <td class="v3">{currentVessel.LAT}</td>
                </tr>
                <tr>
                  <td class="n3">Longitude</td>
                  <td class="v3">{currentVessel.LON}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab>
      </Sidebar>
    </div>
  );
};

export default SidebarMain;
