import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useGeolocated } from "react-geolocated";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const center = {
  lat: 40.7128, // Default location (New York City)
  lng: -74.006
};

const libraries = ["places"]; // For address autocomplete

function MapWithPinSelection() {
  const [mapCenter, setMapCenter] = useState(center);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [address, setAddress] = useState("");

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true
    },
    userDecisionTimeout: 5000
  });

  const onLoad = useCallback(
    (map) => {
      if (coords) {
        const newCenter = {
          lat: coords.latitude,
          lng: coords.longitude
        };
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        map.panTo(newCenter);
      }
    },
    [coords]
  );

  const handleMarkerDrag = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setMarkerPosition(newPosition);
    // Optionally, reverse geocode to get address from lat/lng
  };

  const handleSearchLocation = (place) => {
    const newLocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    setMapCenter(newLocation);
    setMarkerPosition(newLocation);
  };

  const locateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setMapCenter(newCenter);
          setMarkerPosition(newCenter);
        },
        (error) => {
          alert("Error getting location: " + error.message);
        }
      );
    }
  };

  return (
    <div>
      {/* Map Component */}
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_API}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
          onLoad={onLoad}
        >
          {/* Marker for pin location */}
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleMarkerDrag}
          />
        </GoogleMap>
      </LoadScript>

      {/* Locate Me Button */}
      <button onClick={locateMe}>Locate Me</button>

      {/* Add more UI for address search and manual location entry */}
    </div>
  );
}

export default MapWithPinSelection;
