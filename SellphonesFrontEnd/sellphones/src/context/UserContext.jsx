import React, { createContext, useContext, useEffect, useState } from "react";
import UserService from "../service/UserService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await UserService.getProfile();
      if (res.success) {
        setUser(res.user);
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, []); // ✅ chỉ gọi 1 lần khi Dashboard mount

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook cho tiện dùng
export function useUser() {
  return useContext(UserContext);
}
