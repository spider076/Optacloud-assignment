import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./pin";
import { useRecoilState, useSetRecoilState } from "recoil";
import { addressState, autoLocState } from "../atoms/locations";
import { LocateFixed } from "lucide-react";
import ControlPanel from "./ControlPanel";
// import "maplibre-gl/dist/maplibre-gl.css";

// Replace with your Mapbox Access Token
const TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
export default function MapWithPinSelection() {
  const [marker, setMarker] = useState({
    longitude: 77.5855,
    latitude: 12.9634,
    zoom: 15
  });
  const [address, setAddress] = useState("Unknown Location");
  const [autoLocation, setAutoLocation] = useRecoilState(autoLocState);
  const [locAddress, setLocAddress] = useRecoilState(addressState);

  // Handler to fetch address based on longitude and latitude
  const fetchAddress = useCallback(
    (lng, lat) => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=${TOKEN}`
      )
        .then((response) => response.json())
        .then((data) => {
          const placeName = data.features[0]?.place_name || "Unknown Location";
          setAddress(placeName); // Update address
          setLocAddress(placeName);
        })
        .catch((err) => {
          console.error("Geocoding error:", err);
          setAddress("Error retrieving address");
        });
    },
    [locAddress, address]
  );

  // Handler when clicking on the map
  const handleMapClick = useCallback(
    (event) => {
      console.log("from onCLick : ", event);

      const { lng, lat } = event.lngLat;
      setMarker({ longitude: lng, latitude: lat });
      fetchAddress(lng, lat); // Fetch and display address on click
    },
    [fetchAddress]
  );

  const onMarkerDrag = useCallback((event) => {
    const { lng, lat } = event.lngLat;
    setMarker({ longitude: lng, latitude: lat });
    // fetchAddress(lng, lat);
  }, []);

  const onMarkerDragEnd = useCallback(
    (event) => {
      const { lng, lat } = event.lngLat;
      setMarker({ longitude: lng, latitude: lat });
      fetchAddress(lng, lat);

      fetchAddress(lng, lat);
    },
    [fetchAddress]
  );

  // Function to locate user's current location using browser geolocation
  const locateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarker({ latitude, longitude });
          fetchAddress(longitude, latitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  useEffect(() => {
    // locateMe();
    fetchAddress(marker.longitude, marker.latitude);
  }, []);

  return (
    <main className="h-[800px] flex flex-col space-y-4">
      <ReactMapGL
        {...marker}
        mapboxAccessToken={import.meta.env.VITE_ACCESS_TOKEN}
        width="600px"
        height="500px"
        doubleClickZoom={false}
        onDblClick={handleMapClick} // Click event handler
        transitionDuration="200"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        dragRotate={true}
        onViewportChange={(viewport) => setMarker(viewport)}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          // offset={[0, 0]}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          {/* {!autoLocation ? (
            <LocateFixed
              size={25}
              className="animate-ping text-blue-800 transition-colors ease-in-out duration-150"
            />
          ) : ( */}
          <Pin size={30} />
          {/* )} */}
        </Marker>
      </ReactMapGL>

      <ControlPanel locateMe={locateMe} address={address} />
    </main>
  );
}
