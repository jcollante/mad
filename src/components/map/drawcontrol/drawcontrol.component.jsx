import {
  // MapContainer,
  // TileLayer,
  // Polygon,
  FeatureGroup,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useContext, useEffect, useState } from "react";
import { VesselContext } from "../../../contexts/vessel.context";

const DrawControl = () => {
  const { monitoredAreas } = useContext(VesselContext);
  const { setMonitoredAreas } = useContext(VesselContext);
  const { urlServer } = useContext(VesselContext);

  const [mapLayers, setMapLayers] = useState([]);
  const [bounds, setBounds] = useState([]);

  // useEffect(() => {
  //   if (!map) return;
  //   console.log(map.getBounds());

  //   map.on("zoomend", function () {
  //     console.log(map.getBounds());
  //   });
  // }, [map]);

  // useEffect(() => {
  //   if (bounds && bounds?.length > 0) {
  //     map.fitBounds(bounds);
  //   }
  // }, [bounds]);
  useEffect(() => {
    console.log(JSON.stringify(monitoredAreas));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(monitoredAreas),
    };

    fetch(`${urlServer}/uploadAreaJson`, requestOptions);
  }, [monitoredAreas, mapLayers]);

  const _onCreate = (e) => {
    // console.log(e);
    const { layerType, layer } = e;
    const { _northEast, _southWest } = layer._bounds;
    // Set bounds
    setBounds([
      [_northEast.lat, _northEast.lng],
      [_southWest.lat, _southWest.lng],
    ]);

    // if (layerType === "polygon") {
    const { _leaflet_id } = layer;
    setMapLayers((layers) => [
      ...layers,
      { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    ]);

    setMonitoredAreas((monitoredAreas) => [
      ...monitoredAreas,
      { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    ]);

    // const mmon = [
    //   monitoredAreas,
    //   { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
    // ];
    // console.log(mapLayers);
    // console.log(monitoredAreas);
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
    console.log(mapLayers);
  };

  const _onDeleted = (e) => {
    // console.log(e);
    const {
      layers: { _layers },
    } = e;
    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
      setMonitoredAreas((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
    // console.log(mapLayers);
  };

  return (
    <>
      <FeatureGroup>
        <EditControl
          position="bottomright"
          onCreated={_onCreate}
          onEdited={_onEdited}
          onDeleted={_onDeleted}
          draw={{
            rectangle: true,
            polyline: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polygon: true,
          }}
          edit={{ edit: false }}
        />
      </FeatureGroup>

      <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
    </>
  );
};

export default DrawControl;
