import React, { useRef, useEffect } from "react";
import { Polyline, withLeaflet, useMap } from "react-leaflet";
import L, { polyline } from "leaflet";
import "leaflet-polylinedecorator";

const PolylineDecorator = (props) => {
  const map = useMap();
  const { polyline, patterns } = props;
  useEffect(() => {
    console.log("HAY MAPA");
    if (!map) return;
    console.log("INSIDE POLYLINE");
    L.polyline(polyline).addTo(map);
    L.polylineDecorator(polyline, {
      patterns,
    }).addTo(map);
  }, [map]);

  return null;
};

export default PolylineDecorator;
