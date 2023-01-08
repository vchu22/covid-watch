import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import DataStore from "../store";

// React Simple Maps
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const CasesMap = ({ countryName }) => {
  const [coordinates, setCoordinates] = useState(DataStore.getCoordinates());
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    setCoordinates(DataStore.getCoordinates());
  }, [countryName]);

  const handleZoomIn = () => {
    if (zoom >= 16) return;
    setZoom(zoom * 2);
  };
  const handleZoomOut = () => {
    if (zoom <= 1) return;
    setZoom(zoom / 2);
  };

  const handleMoveEnd = (position) => {
    setZoom(position.zoom);
  };

  return (
    <div>
      <ComposableMap projection="geoMercator" height={400}>
        <ZoomableGroup
          zoom={zoom}
          center={coordinates}
          onMoveEnd={handleMoveEnd}
          minZoom={1}
          maxZoom={16}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Marker coordinates={coordinates}>
            <circle
              r={8 / zoom}
              fill="#F00"
              stroke="#FF8888"
              strokeWidth={4 / zoom}
            />
            <text
              textAnchor="middle"
              y={-20 / zoom}
              style={{
                fontFamily: "system-ui",
                fill: "#FFCC88",
                fontSize: 30 / zoom,
              }}
            >
              {countryName}
            </text>
          </Marker>
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <Button handleZoom={handleZoomIn} dir="in" />
        <Button handleZoom={handleZoomOut} dir="out" />
      </div>
    </div>
  );
};

const Button = (props) => {
  const { handleZoom, dir } = props;
  return (
    <button onClick={handleZoom}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="#000"
        strokeWidth="3"
      >
        {dir === "in" ? (
          <React.Fragment>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </React.Fragment>
        ) : (
          <line x1="5" y1="12" x2="19" y2="12" />
        )}
      </svg>
    </button>
  );
};

export default CasesMap;
