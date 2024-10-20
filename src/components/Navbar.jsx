import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authTokenState } from "../atoms/locations";
import { toast } from "sonner";
import AuthModal from "./AuthModal";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const navigate = useNavigate();

  const handleSubmit = async (e, username, password, isLogin) => {
    e.preventDefault();

    const url = isLogin
      ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`
      : `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setAuthToken(data.token); // Store token in Recoil state
        localStorage.setItem("authToken", data.token); // Optionally store token in local storage
        setShowModal(false);
        toast.success("Authentication successful");
      } else {
        toast.error(data?.msg || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <nav className="w-full flex justify-between items-center px-4 py-2 mb-10 shadow-md">
      <h1
        className="font-bold cursor-pointer text-lg"
        onClick={() => navigate("/")}
      >
        Assignment
      </h1>
      <div className="flex space-x-4 items-center">
        <UserInfo />
        {!user ? (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-1 bg-gray-900 hover:bg-black"
          >
            Sign In/Signup
          </button>
        ) : (
          <button
            onClick={() => {
              window.localStorage.removeItem("authToken");
              window.location.reload();
            }}
            className="px-4 py-1 bg-gray-900 hover:bg-black"
          >
            Logout
          </button>
        )}
      </div>
      {showModal && (
        <AuthModal handleClose={handleClose} handleSubmit={handleSubmit} />
      )}
    </nav>
  );
};

export default Navbar;

const UserInfo = () => {
  const { user } = useUser();

  return user ? <p className="font-semibold">{user.username}</p> : null;
};
