import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { autoLocState, triggerLocationState } from "../atoms/locations";
import { Search } from "lucide-react";

const LocationModal = () => {
  const [location, setLocation] = useState(null);
  const [triggerLocation, setTriggerLocation] =
    useRecoilState(triggerLocationState);
  const [userLocation, setUserLocation] = useState(null);
  const setAutoLocState = useSetRecoilState(autoLocState);

  console.log("naviate : ", navigator);

  useEffect(() => {
    // Check if the user has granted location permission
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setTriggerLocation(true);
        console.log("result : ", result);

        if (result.state === "denied") {
          setLocation(false); // Permission is denied
        } else if (result.state === "granted") {
          setTriggerLocation(false);
          setLocation(true);
          setAutoLocState(true);
        }
      });
    } else {
      alert("Geolocation is not available in your browser.");
    }
  }, []);

  const handleEnableLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocation(true);
          setAutoLocState(true);
          setTriggerLocation(false);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocation(false);
          }
        }
      );
    } else {
      alert("Geolocation is not available.");
    }
  };

  console.log("trigger locatin : ", triggerLocation);

  return (
    <main className="w-full h-full">
      {triggerLocation && (
        <div className="fixed bg-black top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-80 bg-opacity-90">
          <div className="bg-white flex flex-col items-center space-y-4 rounded-md py-4 max-w-sm lg:w-[30%]">
            <div className="px-5">
              <h2 className="border-b pb-4 text-xl text-red-600 font-bold ">
                Location Permission Needed
              </h2>
              <span className="mt-2 text-sm text-gray-700 mb-4">
                Your location services are turned off. Please enable it.
              </span>
            </div>

            <img
              src="/assets/locationmap.png"
              className="w-[190px]"
              alt="location"
            />

            <div>
              <button
                onClick={handleEnableLocation}
                className="border-gray-200 bg-[#D8002E] border-y w-full hover:bg-blue-500 hover:text-white text-white font-semibold py-2 px-4 rounded"
              >
                Enable Location
              </button>

              <button
                onClick={() => {
                  setAutoLocState(false);
                  setTriggerLocation(false);
                }}
                className="border-gray-200 mt-3 border-y w-full hover:text-black text-[#D8002E] font-semibold py-2 px-4 inline-flex justify-center items-center text-sm rounded"
              >
                <Search className="mr-2" size={15} /> Search Location Manually
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default LocationModal;
