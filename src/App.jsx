import { useState } from "react";
import "./App.css";
import LocationModal from "./components/LocationModal";
import MapWithPinSelection from "./components/Map";
import ReactMapGL from "react-map-gl";
import AddressForm from "./components/AddressForm";
import Navbar from "./components/Navbar";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4
  });

  return (
    <main>
      <Navbar />
      <MapWithPinSelection />
      <LocationModal />
      <AddressForm />
    </main>
  );
}

export default App;
