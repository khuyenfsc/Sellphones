import React, { createContext, useContext, useEffect, useState } from "react";
import UserService from "../service/UserService";
import OrderService from "../service/OrderService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTotal, setLoadingTotal] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await UserService.getProfile();
      if (res.success) {
        setUser(res.user);
      }
      setLoadingUser(false);
    };

    const fetchTotalOrders = async () => {
      const res = await OrderService.getTotalOrders();
      if (res.success) {
        setTotalOrders(res.total);
      }
      setLoadingTotal(false);
    };

    fetchTotalOrders()
    fetchUser();
  }, []); // ✅ chỉ gọi 1 lần khi Dashboard mount

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, totalOrders, loadingTotal }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook cho tiện dùng
export function useUser() {
  return useContext(UserContext);
}
