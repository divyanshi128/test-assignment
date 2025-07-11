import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

const Dashboard = () => {
 const [tickets, setTickets] = useState([]);
const [counts, setCounts] = useState({ all: 0, resolved: 0, pending: 0 });

  const [filterStatus, setFilterStatus] = useState([]); // ['Resolved', 'Pending']
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
  axios
    .get(`${BACKEND_BASE_URL}/api/tickets/`)
    .then((res) => {
      setTickets(res.data.tickets);
      setCounts(res.data.counts);
    })
    .catch((err) =>
      console.error("Error fetching tickets from the backend:", err)
    );
}, []);


  const allTicketsCount = tickets.length;
  const resolvedTicketsCount = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;
  const pendingTicketsCount = tickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;

  // Filtered tickets based on selected filter
  const filteredTickets =
    filterStatus.length === 0
      ? tickets
      : tickets.filter((t) => filterStatus.includes(t.status));

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const currentItems = filteredTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFilter = (status) => {
    setCurrentPage(1); // Reset to first page
    setFilterStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const clearFilters = () => {
    setFilterStatus([]);
  };

  return (
    <div className="p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">{counts.all}</h3>
          <p className="text-sm text-gray-600">All Tickets</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">{counts.resolved}</h3>
          <p className="text-sm text-gray-600">Resolved Tickets</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">{counts.pending}</h3>
          <p className="text-sm text-gray-600">Pending Tickets</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4">
        {/* Clear All comes first */}
        <span
          onClick={clearFilters}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${filterStatus.length === 0
              ? "bg-blue-200 text-blue-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Clear All
        </span>

        <span
          onClick={() => toggleFilter("Pending")}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${filterStatus.includes("Pending")
              ? "bg-blue-200 text-blue-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Pending
        </span>

        <span
          onClick={() => toggleFilter("Resolved")}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${filterStatus.includes("Resolved")
              ? "bg-blue-200 text-blue-800"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          Resolved
        </span>
      </div>


      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Sl.No</th>
              <th className="px-4 py-2">Ticket ID</th>
              <th className="px-4 py-2">Ticket Type</th>
              <th className="px-4 py-2">Assigned To</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((ticket, idx) => (
              <tr key={ticket.ticket_id} className="border-t">
                <td className="px-4 py-2">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="px-4 py-2">{ticket.ticket_id}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${ticket.type === "Service"
                      ? "bg-blue-100 text-blue-700"
                      : ticket.type === "Application"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-pink-100 text-pink-700"
                      }`}
                  >
                    {ticket.type}
                  </span>
                </td>

                <td className="px-4 py-2">{ticket.assigned_to}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${ticket.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button className="bg-white border border-gray-300 shadow-md px-4 py-1 rounded-md text-sm font-medium text-blue-600 hover:bg-gray-50 transition">
                    Open
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTickets.length)}–
          {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of{" "}
          {filteredTickets.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
