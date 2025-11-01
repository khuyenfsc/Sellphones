import React from "react";
import { ChevronRight } from "lucide-react";
import AccountInfo from "./AccountInfo";
import OrderHistory from "./OrderHistory";
import LogoutConfirm from "./LogoutConfirm";

export default function AccountContent({ activeTab }) {
  return (
    <div className="col-span-2 space-y-4">
      {activeTab === "history" && <OrderHistory />}
      {activeTab === "account" && <AccountInfo />}
      {activeTab === "logout" && <LogoutConfirm />}
    </div>
  );
}
