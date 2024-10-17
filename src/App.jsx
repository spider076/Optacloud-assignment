import { useState } from "react";
import "./App.css";
import LocationModal from "./components/LocationModal";

function App() {
  return (
    <main>
      <LocationModal /> {/* checks for location permission */}
    </main>
  );
}

export default App;
