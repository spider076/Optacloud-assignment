import { MapPin, Save } from "lucide-react";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  addressFormVisibleState,
  autoLocState,
  triggerLocationState
} from "../atoms/locations";

const ControlPanel = ({ locateMe, address }) => {
  const setTriggerLocation = useSetRecoilState(triggerLocationState);
  const autoLoc = useRecoilValue(autoLocState);
  const [saveVisible, setSaveVisible] = useRecoilState(addressFormVisibleState);

  return (
    <main className="flex max-sm:flex-col justify-between bg-white text-black items-center p-4 mb-6 rounded-md">
      <div className="flex flex-col space-y-4 text-left">
        <p className="text-red-500">Save Your Address Now</p>

        <h1 className="flex items-center text-[0.9rem] font-semibold">
          <MapPin className="text-red-800 mr-2" size={40} />
          {address}
        </h1>
      </div>
      <div className="flex flex-col max-sm:space-x-4 max-sm:mt-5 md:space-y-4 max-sm:flex-row">
        <button
          className="text-white bg-red-700 hover:bg-white hover:text-red-600 px-2 py-1 rounded-md flex items-center"
          onClick={() => {
            locateMe();
            // {
            //   !autoLoc && setTriggerLocation(true);
            // }
          }}
        >
          <MapPin className="text-white mr-2" size={15} /> Locate Me
        </button>
        <button
          className="text-white bg-green-800 hover:bg-white hover:text-green-900 px-2 py-1 rounded-md flex items-center"
          onClick={() => {
            setSaveVisible(true);
          }}
        >
          <Save className="text-white mr-2" size={15} /> Save Address
        </button>
      </div>
    </main>
  );
};

export default ControlPanel;
