import React, { useRef, useEffect, useState, useMemo, useContext } from "react";
import { TimeDimension, useMap } from "react-leaflet";
import "leaflet-timedimension";
import "leaflet-timedimension/dist/leaflet.timedimension.control.min.css";

import { VesselContext } from "../../../contexts/vessel.context";

const TimeControl = () => {
  const map = useMap();
  const { currentTime } = useContext(VesselContext);
  const { setCurrentTime } = useContext(VesselContext);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const values = [5, 15, 25, 5, 15, 25, 5];
  const colors = ["red", "green", "blue", "black", "purple", "gray"];

  //   const currentColor = useMemo(
  //     () => colors[currentTimeIndex],
  //     [currentTimeIndex]
  //   );

  useEffect(() => {
    map.timeDimension.on("timeload", (data) => {
      setCurrentTime(new Date(data.time));
    });
  }, [map]);
};

export default TimeControl;
