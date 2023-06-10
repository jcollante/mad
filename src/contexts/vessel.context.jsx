import { createContext, useState } from "react";
// actual value to access
export const VesselContext = createContext({
  currentVessel: null,
  setCurrentVessel: () => null,
  currentTime: null,
  setCurrentTime: () => null,
  urlServer: null,
  setUrlServer: () => null,
  monitoredAreas: null,
  setMonitoredAreas: () => null,
  anomalies: null,
  setAnomalies: () => null,
});

export const VesselProvider = ({ children }) => {
  const [currentVessel, setCurrentVessel] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date(2022, 2, 2, 17, 1, 0)
  );
  // new Date(2022, 3, 13, 22, 0, 0)
  const [urlServer, setUrlServer] = useState("http://127.0.0.1:5000");
  const [monitoredAreas, setMonitoredAreas] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const value = {
    currentVessel,
    setCurrentVessel,
    currentTime,
    setCurrentTime,
    urlServer,
    setUrlServer,
    monitoredAreas,
    setMonitoredAreas,
    anomalies,
    setAnomalies,
  };
  return (
    <VesselContext.Provider value={value}>{children}</VesselContext.Provider>
  );
};
