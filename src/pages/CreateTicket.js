import React from "react";
import {
  Wrench, Eye, FlaskConical, Briefcase,
  Truck, Layers, Server, MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ticketOptions = [
  { label: "Instrument / Service", icon: <Wrench className="w-6 h-6 text-blue-400" />, path: "/instrument-service" },
  { label: "Application / Quality", icon: <Eye className="w-6 h-6 text-blue-400" />, path: "/application-quality" },
  { label: "Lab Inventory", icon: <FlaskConical className="w-6 h-6 text-blue-400" />, path: "/lab-inventory" },
  { label: "Software", icon: <Briefcase className="w-6 h-6 text-blue-400" />, path: "/software" },
  { label: "Sales Order", icon: <Truck className="w-6 h-6 text-blue-400" />, path: "/sales-order" },
  { label: "Infrastructure & Utilities", icon: <Layers className="w-6 h-6 text-blue-400" />, path: "/infrastructure" },
  { label: "Administrative", icon: <Server className="w-6 h-6 text-blue-400" />, path: "/administrative" },
  { label: "Others", icon: <MoreHorizontal className="w-6 h-6 text-blue-400" />, path: "/others" },
];

const CreateTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {ticketOptions.map(({ label, icon, path }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            className="border rounded-xl px-4 py-6 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md cursor-pointer transition"
          >
            <div className="bg-blue-100 rounded-full p-3 mb-4">{icon}</div>
            <p className="text-center font-medium text-gray-800 text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <div className="bg-white px-5 py-4 border rounded-md shadow-md w-full max-w-md text-sm text-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="font-semibold">Redirection Notice</span>
          </div>
          <p className="text-gray-600 text-sm pl-5">
            You will be redirected to specific portals for action
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
