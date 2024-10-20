import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../atoms/locations";

// Custom hook to fetch user data from /me endpoint
export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = useRecoilValue(authTokenState);

  console.log("auth : ", authToken);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${authToken}` }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        setUser(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [authToken]);

  return { user, loading, error };
}
