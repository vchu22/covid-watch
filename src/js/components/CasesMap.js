import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import DataStore from "../store";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});
const layerPaint = {
  "heatmap-weight": {
    property: "cases",
    type: "exponential",
    stops: [
      [0, 0],
      [10, 50],
    ],
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": {
    stops: [
      [0, 0],
      [10, 10],
    ],
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.25,
    "rgb(255, 0, 0)",
    0.5,
    "rgb(230, 8, 8)",
    0.8,
    "rgb(179, 14, 14)",
    1,
    "rgb(153, 20, 20)",
    2,
    "rgb(102, 26, 26)",
  ],
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": {
    stops: [
      [0, 1],
      [10, 50],
    ],
  },
};

class CasesMap extends Component {
  constructor() {
    super();
    this.state = { coordinates: DataStore.getCoordinates() };
  }
  componentDidMount() {
    DataStore.on("change", () => {
      this.setState({
        coordinates: DataStore.getCoordinates(),
      });
    });
  }
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/dark-v10"
        containerStyle={{
          height: "450px",
          margin: "auto",
        }}
        center={this.state.coordinates}
        zoom={[3]}
      >
        <Layer type="heatmap" paint={layerPaint}>
          <Feature
            coordinates={this.state.coordinates}
            properties={{
              cases: 4,
            }}
          ></Feature>
        </Layer>
      </Map>
    );
  }
}

export default CasesMap;
