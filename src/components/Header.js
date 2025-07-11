// src/components/Header.js
import React from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-gray-600"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
        <h1 className="text-lg font-semibold">Welcome Dinesh!</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md pl-10 pr-4 py-2 text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={() => navigate("/create-ticket")}
        >
          Create a ticket
        </button>
        <div
          onClick={() => navigate("/profile")}
          className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer"
        ></div>
      </div>
    </header>
  );
};

export default Header;
