import { useState } from "react";
import "./App.css";
import LocationModal from "./components/LocationModal";
import MapWithPinSelection from "./components/Map";

function App() {
  return (
    <main>
      <MapWithPinSelection />
      <LocationModal /> {/* checks for location permission */}
    </main>
  );
}

export default App;
