import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { authTokenState } from "../atoms/locations";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function AuthModal({ handleSubmit, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authToken, setAuthToken] = useRecoilState(authTokenState);

  return (
    <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white max-md:w-[90%] w-[500px] p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <h2 className="text-xl text-gray-700 font-semibold mb-4">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <X
            className="text-black hover:text-red-500 cursor-pointer"
            size={20}
            onClick={handleClose}
          />
        </div>

        <form onSubmit={(e) => handleSubmit(e, email, password, isLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="block  text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border bg-white text-gray-600 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-white text-gray-600 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-md"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button
          className="mt-4 text-sm text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don’t have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
}
