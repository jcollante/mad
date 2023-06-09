import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";

import ShipIcon from "../icon/ship-icon.component";
import AISLostIcon from "../icon/ais-signal-lost-icon.component";
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

  const markerRef = useRef();

  // Call useEffect by changing the variable and then causing the rendering effect
  useEffect(() => {
    fetch(
      `${urlServer}/getAllVesselsInElapsedTime?timeframe_min=1&current_time=${
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
      `${urlServer}/getAllVesselsInElapsedTime?timeframe_min=${timeFrame}&current_time=${
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
    if (v.hasAnomaly) return AnomalyIcon();
    else if (v.AISLost) return AISLostIcon();
    else return ShipIcon();
  };

  const eventHandlers = useMemo(
    (e) => ({
      mouseover() {
        console.log("over");
        if (markerRef) markerRef.current.openPopup();
      },
      mouseout() {
        console.log("out");
        if (markerRef) markerRef.current.closePopup();
      },
    }),
    []
  );

  return (
    <>
      {visibleVessels.map((v) => (
        <Marker
          key={"marker-" + v.MMSI + Math.random() * 1000}
          position={[getLatLng(v).lat, getLatLng(v).lon]}
          icon={getCorrectIcon(v)}
          data={v}
          eventHandlers={{
            // click: (e) => {
            //   updateSelectedVessel(e);
            //   e.target.openPopup();
            // },
            mouseover: (e) => {
              updateSelectedVessel(e);
              e.target.openPopup();
            },
          }}
          rotationAngle={Math.abs(v.Heading)}
        ></Marker>
      ))}
    </>
  );
};

export default Vessels;
