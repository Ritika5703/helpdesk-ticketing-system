import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const statusColor = {
  "In Progress": "bg-green-300 text-black",
  "On hold": "bg-blue-900 text-white",
  Closed: "bg-gray-700 text-white",
};

const MyTickets = () => {
  const { backendUrl } = useContext(AppContext);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${backendUrl}/api/tickets/my`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setTickets(res.data.tickets);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchTickets();
  }, []);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="p-6 flex-1">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              List of Ticket
            </h2>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
              <div className="flex items-center border rounded-md px-3 py-1 bg-gray-100 w-64">
                <input
                  type="text"
                  placeholder="Find ticket"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button>
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011.5 19.5a7.5 7.5 0 005.15-2.85z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <label htmlFor="entries">Show:</label>
                <select
                  id="entries"
                  className="border bg-gray-100 rounded px-2 py-1 text-sm"
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>Entries</span>
              </div>
            </div>

            {/* Tickets Table */}
            <div className="overflow-x-auto border border-gray-300 rounded">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="px-4 py-2">Ticket No.</th>
                    <th className="px-4 py-2">Subject</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Support by</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="even:bg-gray-100 odd:bg-white"
                    >
                      <td
                        className="px-4 py-2 text-blue-600 underline cursor-pointer font-semibold"
                        onClick={() => openModal(ticket)}
                      >
                        {ticket.ticketNo}
                      </td>
                      <td className="px-4 py-2">{ticket.subject}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            statusColor[ticket.status] || "bg-gray-300"
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {ticket.supportBy?.name || "Not Assigned"}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(ticket.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-4 py-2 text-yellow-400 text-base flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) =>
                          ticket.rating >= i ? (
                            <FaStar key={i} />
                          ) : ticket.rating >= i - 0.5 ? (
                            <FaStarHalfAlt key={i} />
                          ) : (
                            <FaRegStar key={i} />
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {tickets.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tickets found.
                </div>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="text-sm mt-4 flex justify-between items-center">
              <span>
                Showing 1 to {tickets.length} of {tickets.length} entries
              </span>
              <div className="space-x-2 text-gray-600 text-xl">
                <span className="cursor-pointer">&laquo;</span>
                <span className="font-semibold">1</span>
                <span className="cursor-pointer">&raquo;</span>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>

      {/* MODAL without dark overlay */}
      {showModal && selectedTicket && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white border border-gray-300 p-6 w-[500px] rounded-md shadow-lg z-50">
            <h3 className="text-center text-lg font-semibold mb-4">
              Ticket Details
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <strong>Ticket No:</strong> {selectedTicket.ticketNo}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTicket.date).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Name:</strong> {selectedTicket.name}
              </p>
              <p>
                <strong>Dept:</strong> {selectedTicket.department}
              </p>
              <br />
              <p>
                <strong>Title:</strong> {selectedTicket.subject}
              </p>
              <p>
                <strong>Description:</strong> {selectedTicket.description}
              </p>
              <p>
                <strong>Category:</strong> {selectedTicket.category}
              </p>
              <p>
                <strong>Type:</strong> {selectedTicket.type}
              </p>
              <p>
                <strong>Priority:</strong> {selectedTicket.priority}
              </p>
              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Attachment:</strong>{" "}
                {selectedTicket.attachment || "None"}
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={closeModal}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-6 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTickets;
