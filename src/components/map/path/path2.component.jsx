// import PolylineDecorator from "../polyline/polyline.component";
import { useMap, Polyline } from "react-leaflet";
import L from "leaflet";
import { useContext, useEffect, useState } from "react";
import "leaflet-polylinedecorator";

import { VesselContext } from "../../../contexts/vessel.context";

const Path2 = () => {
  const map = useMap();
  const [polyline, setPolyline] = useState([]);
  const { currentVessel } = useContext(VesselContext);
  const { currentTime } = useContext(VesselContext);
  const { urlServer } = useContext(VesselContext);

  const arrow = [
    {
      offset: 12,
      repeat: 25,
      symbol: L.Symbol.dash({
        pixelSize: 10,
        pathOptions: { color: "#f00", weight: 2 },
      }),
    },
    { offset: 0, repeat: 25, symbol: L.Symbol.dash({ pixelSize: 0 }) },
  ];

  useEffect(() => {
    fetch(
      `${urlServer}/getVesselPathById?id=${
        currentVessel.MMSI
      }&timeframe_min=60&current_time=${
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
      .then((json) => {
        let path = [];
        json.map((v) => {
          path.push([v.LAT, v.LON]);
        });
        return path;
      })
      .then((json_linepath) => setPolyline(json_linepath));
  }, [currentTime, urlServer, currentVessel]);

  const conditionalRender = (polyline) => {
    if (currentVessel)
      return (
        <Polyline
          patterns={arrow}
          positions={polyline}
          dashArray={[1, 5]}
          dashOffset={3}
          color={"#f00"}
        />
      );
    else return;
  };

  return conditionalRender(polyline);
};

export default Path2;
