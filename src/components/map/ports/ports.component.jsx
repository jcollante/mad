import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import PortIcon from "../icon/port-icon.component";
import L, { latLng } from "leaflet";

const Ports = ({ test, setTest }) => {
  const map = useMap();

  const [ports, setPorts] = useState([]);
  const [viewPort, setViewPort] = useState([null]);
  const [visiblePorts, setVisiblePorts] = useState([]);

  // Call useEffect by changing the variable and then causing the rendering effect
  useEffect(() => {
    // fetch("https://raw.githubusercontent.com/jcollante/mad/main/ports.json")
    fetch("https://raw.githubusercontent.com/jcollante/mad/main/ports.json")
      .then((response) => response.json())
      .then((json_ports) => setPorts(json_ports.ports))
      .then(() => setViewPort(map.getBounds()));
  }, []);

  useEffect(() => {
    if (!map) return;

    // trigger wehen the map was initialized
    map.on("load", function () {
      console.log(map.getBounds());
      setViewPort(map.getBounds());
    });
    // trigger wehen the map zoom in or out
    map.on("zoomend", function () {
      setViewPort(map.getBounds());
    });
    // trigger wehen the map moves
    map.on("moveend", function () {
      setViewPort(map.getBounds());
    });
  }, [map]);

  const getLatLng = (port) => {
    if (
      typeof port.coordinates === "undefined" ||
      port.coordinates === "undefined"
    ) {
      return;
    }

    const lon = Number(port?.coordinates[0]);
    const lat = Number(port?.coordinates[1]);

    if (
      typeof lat === "undefined" ||
      lat === "undefined" ||
      typeof lon === "undefined" ||
      lon === "undefined"
    ) {
      return;
    } else return { lat: lat, lon: lon };
  };

  useEffect(() => {
    if (!map) return;
    if (!ports) return;
    const temp_ports = [];
    ports.map((port) => {
      const { lat, lon } = getLatLng(port) || {};
      if (
        typeof lat !== "undefined" &&
        lat !== "undefined" &&
        typeof lon !== "undefined" &&
        lon !== "undefined"
      ) {
        latLng = new L.LatLng(lat, lon);
        if (map.getBounds().contains(latLng)) {
          temp_ports.push(port);
        }
      }
    });
    setVisiblePorts(temp_ports);
  }, [viewPort]);

  // const RenderInBounds = ({ port }) => {
  //   if (!map) return;

  //   if (
  //     typeof port.coordinates === "undefined" ||
  //     port.coordinates === "undefined"
  //   ) {
  //     return;
  //   }

  //   const lon = Number(port?.coordinates[0]);
  //   const lat = Number(port?.coordinates[1]);
  //   // console.log([lat, lon]);
  //   try {
  //     latLng = new L.LatLng(lat, lon);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   if (map.getBounds().contains(latLng)) {
  //     // console.log({ latLng });
  //     return (
  //       <Marker
  //         key={Math.random() * 1000}
  //         position={[lat, lon]}
  //         icon={PortIcon()}
  //       />
  //     );
  //   }
  // };

  return (
    <>
      {/* {ports.map((port) => (
        <RenderInBounds port={port} />
      ))} */}
      {visiblePorts.map((port) => (
        <Marker
          key={Math.random() * 1000}
          position={[getLatLng(port).lat, getLatLng(port).lon]}
          icon={PortIcon()}
          eventHandlers={{
            click: (e) => {},
          }}
        >
          <Popup key={Math.random() * 1000}></Popup>
        </Marker>
      ))}
    </>

    // <div>
    //   {typeof ports !== "undefined" &&
    //     ports.map(
    //       (port) =>
    //         typeof ports !== "undefined" &&
    //         typeof port.coordinates !== "undefined" &&
    //         port.coordinates !== "undefined" && (
    //           <Marker
    //             key={Math.random() * 1000}
    //             position={[port?.coordinates[1], port?.coordinates[0]]}
    //             eventHandlers={{
    //               click: () => {
    //                 setActivePort(port);
    //               },
    //             }}
    //             icon={PortIcon()}
    //           />
    //         )
    //     )}

    //   {activePort &&
    //     typeof activePort.coordinates !== "undefined" &&
    //     activePort.coordinates !== "undefined" && (
    //       <Popup
    //         position={[activePort?.coordinates[1], activePort?.coordinates[0]]}
    //         onClose={() => {
    //           setActivePort(null);
    //         }}
    //       >
    //         <div>
    //           <h2>{activePort?.unlocs[0]}</h2>
    //           <p>Country:{activePort?.country}</p>
    //           <p>City:{activePort?.name}</p>
    //         </div>
    //       </Popup>
    //     )}
    // </div>
  );
};

export default Ports;
