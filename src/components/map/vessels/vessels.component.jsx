import React, { useState, useEffect, useContext } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";

import ShipIcon from "../icon/ship-icon.component";
import AnomalyIcon from "../icon/anomaly-icon.component";
import L, { latLng } from "leaflet";

import { VesselContext } from "../../../contexts/vessel.context";

const Vessels = () => {
  const map = useMap();

  const [vessels, setVessels] = useState([]);
  const [viewPort, setViewPort] = useState([null]);
  const [visibleVessels, setVisibleVessels] = useState([]);
  const [timeFrame, setTimeFrame] = useState(10);

  const { setCurrentVessel } = useContext(VesselContext);
  const { currentVessel } = useContext(VesselContext);
  const { currentTime } = useContext(VesselContext);
  const { urlServer } = useContext(VesselContext);

  // Call useEffect by changing the variable and then causing the rendering effect
  useEffect(() => {
    fetch(
      `${urlServer}/getVesselsInElapsedTime?timeframe_min=0&current_time=${
        currentTime.toISOString().split(".")[0]
      }`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
      .then((response) => response.json())
      .then((json_vessels) => setVessels(json_vessels))
      .then(() => setViewPort(map.getBounds()));
  }, []);

  const getLatLng = (v) => {
    if (
      typeof v.LAT === "undefined" ||
      v.LAT === "undefined" ||
      typeof v.LON === "undefined" ||
      v.LON === "undefined"
    ) {
      return;
    }

    const lon = Number(v?.LON);
    const lat = Number(v?.LAT);

    if (
      typeof lat === "undefined" ||
      lat === "undefined" ||
      typeof lon === "undefined" ||
      lon === "undefined"
    ) {
      return;
    } else return { lat: lat, lon: lon };
  };

  const updateVisibleVessels = () => {
    if (!map) return;
    if (!vessels) return;
    const temp_vessels = [];
    vessels.map((v) => {
      const { lat, lon } = getLatLng(v) || {};
      if (
        typeof lat !== "undefined" &&
        lat !== "undefined" &&
        typeof lon !== "undefined" &&
        lon !== "undefined"
      ) {
        latLng = new L.LatLng(lat, lon);
        if (map.getBounds().contains(latLng)) {
          temp_vessels.push(v);
        }
      }
    });
    setVisibleVessels(temp_vessels);
  };

  useEffect(() => {
    if (!map) return;

    // trigger wehen the map zoom in or out
    map.on("zoomend", function () {
      setViewPort(map.getBounds());
    });
    // trigger wehen the map moves
    map.on("moveend", function () {
      setViewPort(map.getBounds());
    });

    map.on("click", function () {
      setCurrentVessel(0);
    });
  }, [map]);

  useEffect(() => {
    fetch(
      `${urlServer}/getVesselsInElapsedTime?timeframe_min=${timeFrame}&current_time=${
        currentTime.toISOString().split(".")[0]
      }`,
      {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
      .then((response) => response.json())
      .then((json_vessels) => setVessels(json_vessels))
      .then(() => updateVisibleVessels());
  }, [currentTime, urlServer]);

  useEffect(() => {
    updateVisibleVessels();
  }, [viewPort]);

  const updateSelectedVessel = (e) => {
    setCurrentVessel(e.target.options.data);
    return;
  };

  const getCorrectIcon = (v) => {
    if (!v.hasAnomaly) return ShipIcon();
    else return AnomalyIcon();
  };

  return (
    <>
      {visibleVessels.map((v) => (
        <Marker
          key={"marker-" + v.MMSI + Math.random() * 1000}
          position={[getLatLng(v).lat, getLatLng(v).lon]}
          icon={getCorrectIcon(v)}
          data={v}
          eventHandlers={{
            click: (e) => {
              updateSelectedVessel(e);
            },
          }}
          rotationAngle={Math.abs(v.Heading)}
        ></Marker>
      ))}
      {currentVessel && (
        <Popup
          key={"vessel-" + currentVessel.MMSI + Math.random() * 1000}
          position={[currentVessel.LAT, currentVessel.LON]}
        >
          <div className="div-popup-container">
            <h4>Vessel Options</h4>

            <p>MMSI: {currentVessel.MMSI}</p>
            <p>Name: N/A </p>
            <p>Vessel Type: </p>
            <p>Length: N/A</p>
            <p>Width: N/A</p>
            <p>Draft: N/A</p>
            <p>Cargo: N/A </p>
            <p>lat: {currentVessel.LAT}</p>
            <p>lon: {currentVessel.LON}</p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default Vessels;
