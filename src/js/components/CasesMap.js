import React, { Component } from "react";
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
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class CasesMap extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: DataStore.getCoordinates(),
      zoom: 4,
    };
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleMoveEnd = this.handleMoveEnd.bind(this);
  }
  componentDidMount() {
    DataStore.on("change", () => {
      this.setState({
        coordinates: DataStore.getCoordinates(),
      });
    });
  }
  handleZoomIn() {
    if (this.state.zoom >= 16) return;
    this.setState({
      zoom: this.state.zoom * 2,
    });
  }

  handleZoomOut() {
    if (this.state.zoom <= 1) return;
    this.setState({ zoom: this.state.zoom / 2 });
  }

  handleMoveEnd(position) {
    this.setState({
      coordinates: position.coordinates,
      zoom: position.zoom,
    });
  }

  render() {
    const { coordinates, zoom } = this.state;
    return (
      <div>
        <ComposableMap projection="geoMercator">
          <ZoomableGroup
            zoom={zoom}
            center={coordinates}
            onMoveEnd={this.handleMoveEnd}
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
                y={-10}
                style={{
                  fontFamily: "system-ui",
                  fill: "#FFCC88",
                  fontSize: 12,
                }}
              >
                {this.props.countryName}
              </text>
            </Marker>
          </ZoomableGroup>
        </ComposableMap>
        <div className="controls">
          <Button handleZoom={this.handleZoomIn} dir="in" />
          <Button handleZoom={this.handleZoomOut} dir="out" />
        </div>
      </div>
    );
  }
}

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
