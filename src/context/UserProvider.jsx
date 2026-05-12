import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { UserContext } from "./UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export const UserProvider = ({ children }) => {
  const { currentUser, token, userRole, isLoading } = useAuth();

  const [user, setUser] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!currentUser || !token || !userRole) {
          setUser(null);
          return;
        }

        let endpoint = "";

        if (userRole === "user") {
          endpoint = "/user/me";
        } else if (userRole === "provider") {
          endpoint = "/provider/me";
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }
        // console.log(data)
        setUser(data.profile);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setProfileLoading(false);
      }
    };

    if (!isLoading) {
      fetchProfile();
    }
  }, [currentUser, token, userRole, isLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
