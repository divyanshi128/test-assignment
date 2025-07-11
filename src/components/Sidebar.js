// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, PlusCircle, X } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Profile", path: "/profile", icon: <User size={20} /> },
    { label: "Dashboard", path: "/", icon: <Home size={20} /> },
    { label: "Create Ticket", path: "/create-ticket", icon: <PlusCircle size={20} /> },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 h-full bg-white border-r border-gray-200 w-64 p-4 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:block`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold">🧾 POCT Services</div>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          {navItems.map(({ label, path, icon }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 ${
                pathname === path ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
