import React from "react";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

    </div>
  );
};

export default MainLayout;
