// File: src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateTicket from "./pages/CreateTicket";

// Ticket type pages (you'll create these)
import InstrumentService from "./pages/tickets/InstrumentService";
import ApplicationQuality from "./pages/tickets/ApplicationQuality";
import LabInventory from "./pages/tickets/LabInventory";
import Software from "./pages/tickets/Software";
import SalesOrder from "./pages/tickets/SalesOrder";
import Infrastructure from "./pages/tickets/Infrastructure";
import Administrative from "./pages/tickets/Administrative";
import Others from "./pages/tickets/Others";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          <main className="p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
              <Route path="/instrument-service" element={<InstrumentService />} />
              <Route path="/application-quality" element={<ApplicationQuality />} />
              <Route path="/lab-inventory" element={<LabInventory />} />
              <Route path="/software" element={<Software />} />
              <Route path="/sales-order" element={<SalesOrder />} />
              <Route path="/infrastructure" element={<Infrastructure />} />
              <Route path="/administrative" element={<Administrative />} />
              <Route path="/others" element={<Others />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
