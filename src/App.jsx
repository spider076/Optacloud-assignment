import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import { authTokenState } from "./atoms/locations";
import AddressForm from "./components/AddressForm";
import AddressList from "./components/AddressList";
import LocationModal from "./components/LocationModal";
import MapWithPinSelection from "./components/Map";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate();

  const storedAuthToken = localStorage.getItem("authToken");
  const [, setAuthToken] = useRecoilState(authTokenState);

  useEffect(() => {
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
    }
  }, [storedAuthToken, setAuthToken]);

  return (
    <main>
      <Navbar />
      <Routes>
        <Route
          path="*"
          element={
            <>
              <section className="px-8 pb-20 max-w-7xl flex flex-col mx-auto">
                <h1
                  className="py-1 self-end px-4 text-blue-400 mb-4 w-max border-b cursor-pointer hover:border-blue-500 hover:text-white"
                  onClick={() => navigate("/addresses")}
                >
                  Manage Addresses
                </h1>
                <MapWithPinSelection />
                <LocationModal />
              </section>

              <AddressForm />
            </>
          }
        />
        <Route path="/addresses" element={<AddressList />} />
      </Routes>
      
      {/* footer */}
      <footer className="flex bg-[#242424] z-10 fixed bottom-0 w-full space-x-4 border-t justify-center py-4">
        <a
          href="https://github.com/spider076/Optacloud-assignment.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 mr-4"
            // class="lucide lucide-github"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/mohammed-saad-9774b2253/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            // class="lucide lucide-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </footer>
    </main>
  );
}

export default App;
