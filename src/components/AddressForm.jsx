// AddressForm.js
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addressFormVisibleState,
  addressState,
  authTokenState
} from "../atoms/locations";
import { Factory, Home, MapPin, Users, X } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const AddressForm = () => {
  const [visible, setVisible] = useRecoilState(addressFormVisibleState);
  const [savedAddress, setSavedAddress] = useRecoilState(addressState);
  const authToken = useRecoilValue(authTokenState);

  useEffect(() => {}, [savedAddress]);

  const [addressDetails, setAddressDetails] = useState({
    houseNo: "",
    roadArea: "",
    category: "",
    address: savedAddress && savedAddress
  });

  const handleInputChange = (e) => {
    setAddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const [saveVisible, setSaveVisible] = useRecoilState(addressFormVisibleState);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const requiredFields = ["houseNo", "apartment", "category"];
    const emptyFields = requiredFields.filter((field) => addressDetails[field]);

    if (
      addressDetails.address === "" ||
      addressDetails.category === "" ||
      addressDetails.houseNo === "" ||
      addressDetails.roadArea === ""
    ) {
      toast.error("Please fill in all fields.");
      console.log(addressDetails);

      return;
    }

    console.log(addressDetails);

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      };

      const body = {
        houseNo: addressDetails?.houseNo,
        apartment: addressDetails?.roadArea,
        category: addressDetails?.category,
        fullAddress: savedAddress
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/save`,
        body,
        config
      );

      console.log("res pn ", response);

      if (response.data) {
        toast.success("Address saved successfully!");
        setSaveVisible(false); // Hide the form after success
      }
    } catch (error) {
      toast.error("Error saving address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-28 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-6 md:max-w-[600px] max-md:w-[90%] ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 100 }}
    >
      <X
        className=" text-black mr-2 float-right hover:text-red-700"
        size={20}
        onClick={() => setVisible(false)}
      />

      <h2 className="text-xl border-b pb-2 text-gray-800 font-sans font-semibold mb-4">
        Save Address
      </h2>

      <div className="flex justify-between px-2 items-center">
        <h1 className="flex items-center text-gray-600 text-[0.8rem] font-semibold mb-4 text-left">
          <MapPin className="text-red-800 mr-2 " size={40} />
          {savedAddress}
        </h1>
      </div>

      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-left font-medium text-gray-700">
            House /Flat /Block No.
          </label>
          <input
            type="text"
            name="houseNo"
            value={addressDetails.houseNo}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-left font-medium text-gray-700">
            Apartment /Road /Area
          </label>
          <input
            type="text"
            name="roadArea"
            value={addressDetails.roadArea}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full bg-white text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-left font-medium text-gray-700">
            Save As
          </label>
          <div className="flex space-x-4 py-4 ">
            <button
              className={`p-2 rounded-full ${
                addressDetails.category === "Home"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={(e) => {
                e.preventDefault();

                setAddressDetails({ ...addressDetails, category: "Home" });
              }}
            >
              <Home className="text-black" size={20} />
            </button>
            <button
              className={`p-2 rounded-full ${
                addressDetails.category === "Office"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setAddressDetails({ ...addressDetails, category: "Office" });
              }}
            >
              <Factory className="text-black" size={20} />
            </button>
            <button
              className={`p-2 rounded-full ${
                addressDetails.category === "Friends"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setAddressDetails({ ...addressDetails, category: "Friends" });
              }}
            >
              <Users className="text-black" size={20} />
            </button>
          </div>
        </div>
      </form>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-4 w-full bg-green-700 text-white p-2 rounded-md shadow-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500 focus:border-green-700"
      >
        {loading ? "Loading..." : "Save Address"}
      </button>
    </div>
  );
};

export default AddressForm;
