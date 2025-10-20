import React from "react";
import { ChevronRight } from "lucide-react";

const CategorySidebar = ({ categories }) => {
  return (
    <aside className="w-64 flex-shrink-0">
      <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition"
          >
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">{cat.icon}</span>
              <span className="text-sm text-gray-700">{cat.name}</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
