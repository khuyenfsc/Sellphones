// src/components/admin/StatCard.jsx
import React from "react";

const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-200">
    {/* Icon */}
    <div className="bg-gray-700 p-3 rounded-lg mb-4 flex items-center justify-center">
      <Icon className="w-6 h-6 text-gray-300" />
    </div>

    {/* Value */}
    <p className="text-2xl font-bold text-white">{value}</p>

    {/* Title */}
    <p className="text-sm text-gray-400 mt-1">{title}</p>

    {/* Change */}
    {change && (
      <p
        className={`text-sm mt-1 ${changeType === "up" ? "text-green-400" : "text-red-400"
          }`}
      >
        {changeType === "up" ? "↑" : "↓"} {change}
      </p>
    )}
  </div>
);

export default StatCard;
