import { geoCentroid } from "d3-geo";
import PropTypes, { func } from 'prop-types'
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export const MapChart = ({ handleState = () => {} }) => {
  const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 });
  const [selectedState, setSelectedState] = useState(null); // Store selected state

  // Function to handle zooming into a clicked state
  const handleClick = async (geo) => {
    const centroid = geoCentroid(geo); // Calculate the center of the clicked state
    setPosition({ coordinates: centroid, zoom: 2 }); // Set zoom and center
    setSelectedState(geo.rsmKey); // Set the clicked state as selected
    handleState(geo.properties.name);
  };

  // Function to reset the zoom and selection
  const handleReset = () => {
    setPosition({ coordinates: [-97, 38], zoom: 1 });
    setSelectedState(null); // Clear the selected state
    handleState(null);
  };

  return (
    <div style={{ width: '80rem' }}>
      <ComposableMap projection="geoAlbersUsa" width={1200} height={500}>
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={setPosition}
          minZoom={1}
          maxZoom={10}
          translateExtent={[
            [-500, -200],
            [1500, 800],
          ]}
        >
          <Geographies geography={usGeoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleClick(geo)}
                  style={{
                    default: {
                      fill: selectedState === geo.rsmKey ? "#FF6347" : "#D6D6DA",
                      outline: "none",
                      stroke: "#000000", // Black outline
                      strokeWidth: 0.75, // Adjust thickness of the outline
                    },
                    hover: {
                      fill: selectedState === geo.rsmKey ? "#FF6347" : "#F53",
                      outline: "none",
                      stroke: "#000000",
                      strokeWidth: 0.75,
                    },
                    pressed: {
                      fill: selectedState === geo.rsmKey ? "#FF6347" : "#E42",
                      outline: "none",
                      stroke: "#000000",
                      strokeWidth: 0.75,
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <button onClick={handleReset}>Reset Zoom</button>
    </div>
  );
};

MapChart.propTypes = {
    handleState: PropTypes.func.isRequired
}