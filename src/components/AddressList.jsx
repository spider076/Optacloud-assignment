import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../atoms/locations";
import { toast } from "sonner";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // JWT token is stored in localStorage
  const token = useRecoilValue(authTokenState);

  // Fetch the list of saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/address`,
          config
        );

        console.log("res : ", response);
        setAddresses(response.data);
      } catch (error) {
        setError("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  // Delete an address
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAddresses(addresses.filter((address) => address._id !== id));
      toast.success("deleted succesfully !");
    } catch (error) {
      toast.error("Failed to delete the address.");
    }
  };

  // Filter addresses based on search input
  const filteredAddresses = addresses.filter((address) =>
    address.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border bg-transparent border-gray-500 p-2 mb-4 w-full"
      />

      {loading && <p>Loading addresses...</p>}

      {!loading && filteredAddresses.length === 0 && <p>No addresses found.</p>}

      <ul className="space-y-4">
        {filteredAddresses.map((address) => (
          <li
            key={address._id}
            className="p-4 border rounded-md flex justify-between"
          >
            <div>
              <p>
                <strong>{address.category}</strong>: {address.fullAddress}
              </p>
              <p>
                House No: {address.houseNo}, Apartment: {address.apartment}
              </p>
            </div>

            {/* Edit, Delete buttons */}
            <div className="flex space-x-2">
              <button
                className="text-blue-600 hover:underline"
                // onClick={() => setSelectedAddress(address)} // Set selected address for edit
              >
                <Edit size={20} />
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(address?._id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
