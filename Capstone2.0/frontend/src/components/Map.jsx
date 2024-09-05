import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = (locations) => {
  var locations = locations.activities;
  return (
    <div className="map-container" style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[39.9612, -82.9988]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(
          (location) =>
            location.latitude &&
            location.longitude && (
              <Marker
                key={location.id}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <strong>{location.name}</strong>
                  <br />
                  {location.description}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
