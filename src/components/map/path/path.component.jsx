// // import PolylineDecorator from "../polyline/polyline.component";
// import { useMap } from "react-leaflet";
// import L from "leaflet";
// import { useEffect, useState } from "react";
// import "leaflet-polylinedecorator";

// const Path = ({ vessel, currentTime }) => {
//   const map = useMap();
//   const [polyline, setPolyline] = useState([]);
//   const [viewPort, setViewPort] = useState([null]);
//   const [currentLines, setCurrentLines] = useState([]);
//   const [layerGroup, setLayerGroup] = useState([]);
//   const arrow = [
//     // {
//     //   offset: "100%",
//     //   repeat: 0,
//     //   symbol: L.Symbol.arrowHead({
//     //     pixelSize: 15,
//     //     polygon: false,
//     //     pathOptions: { stroke: true },
//     //   }),
//     // },
//     {
//       offset: 12,
//       repeat: 25,
//       symbol: L.Symbol.dash({
//         pixelSize: 10,
//         pathOptions: { color: "#f00", weight: 2 },
//       }),
//     },
//     { offset: 0, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 0 }) },
//     // {
//     //   offset: "0",
//     //   repeat: "33%",
//     //   symbol: L.Symbol.marker({
//     //     rotate: true,
//     //     markerOptions: {
//     //       icon: L.icon({
//     //         iconUrl: "./ship.png",
//     //         iconAnchor: [16, 16],
//     //         iconSize: [50, 50],
//     //       }),
//     //     },
//     //   }),
//     // },
//   ];

//   useEffect(() => {
//     // remove all drawed lines
//     // currentLines.forEach(function (item) {
//     //     map.removeLayer(item)
//     // });
//     console.log(`id=${vessel}`);
//     fetch(
//       `http://127.0.0.1:5000/getVesselPathById?id=${vessel}&timeframe_min=60&current_time=${
//         currentTime.toISOString().split(".")[0]
//       }`
//     )
//       .then((response) => response.json())
//       .then((json) => {
//         let path = [];
//         json.map((v) => {
//           path.push([v.LAT, v.LON]);
//         });
//         return path;
//       })
//       .then((json_linepath) => setPolyline(json_linepath))
//       .then((path) => console.log(polyline));
//     //   .then(() => setViewPort(map.getBounds()))
//   }, [vessel]);

//   const PolylineDecorator = (props) => {
//     const { polyline, patterns, map } = props;
//     useEffect(() => {
//       if (!map) return;
//       //   L.polyline(polyline).addTo(map);

//       L.polylineDecorator(polyline, {
//         patterns,
//       }).addTo(map);
//     }, [map]);

//     return null;
//   };

//   const conditionalRender = (polyline) => {
//     return <PolylineDecorator patterns={arrow} polyline={polyline} map={map} />;
//   };

//   return conditionalRender(polyline);
// };

// export default Path;
