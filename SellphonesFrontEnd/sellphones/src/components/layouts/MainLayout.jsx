import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow container mx-auto px-4 py-6">
         <Outlet />
      </main>

      <Footer
      />
    </div>
  );
};

export default MainLayout;
