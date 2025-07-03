import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NewTicket = () => {
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    ticketNo: "",
    date: "",
    name: "",
    department: "",
    subject: "",
    category: "",
    type: "",
    priority: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${backendUrl}/api/tickets/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Ticket created successfully!");
        setFormData({
          ticketNo: "",
          date: "",
          name: "",
          department: "",
          subject: "",
          category: "",
          type: "",
          priority: "",
          description: "",
        });
      } else {
        toast.error(data.message || "Ticket creation failed.");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6">
            <h2 className="text-3xl font-normal mb-10 text-center">
              Create New Ticket
            </h2>

            <form
              className="grid grid-cols-2 gap-x-10 gap-y-6 w-full max-w-7xl mx-auto"
              onSubmit={handleSubmit}
            >
              {/* Ticket No. */}
              <div className="flex items-center gap-4">
                <label className="w-[130px] text-[20px] font-sanchez text-black">
                  Ticket No.
                </label>
                <input
                  name="ticketNo"
                  type="text"
                  value={formData.ticketNo}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Date */}
              <div className="flex items-center gap-4">
                <label className="w-[130px] text-[20px] font-sanchez text-black">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Name */}
              <div className="flex items-center gap-4">
                <label className="w-[130px] text-[20px] font-sanchez text-black">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Department */}
              <div className="flex items-center gap-4">
                <label className="w-[130px] text-[20px] font-sanchez text-black">
                  Department
                </label>
                <input
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Subject */}
              <div className="col-span-2">
                <label className="block text-[20px] font-sanchez text-black mb-1">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Category + Type + Priority */}
              <div className="col-span-2 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  <div>
                    <label className="block text-[20px] font-sanchez text-black mb-1">
                      Category
                    </label>
                    <input
                      name="category"
                      type="text"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[20px] font-sanchez text-black mb-1">
                      Type
                    </label>
                    <input
                      name="type"
                      type="text"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[20px] font-sanchez text-black mb-1">
                      Priority
                    </label>
                    <input
                      name="priority"
                      type="text"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="w-full md:w-1/2 flex flex-col">
                  <label className="block text-[20px] font-sanchez text-black mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full h-full min-h-[186px] p-2 rounded-[10px] shadow bg-gray-200 resize-none border border-black/10"
                    required
                  />
                </div>
              </div>

              {/* CAPTCHA + Submit */}
              <div className="col-span-2 flex justify-between items-center mt-6">
                <div className="flex justify-between items-center border border-gray-300 rounded-sm px-4 py-3 w-full max-w-md bg-gray-100">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-6 h-6 border border-gray-400 rounded-sm accent-[#55D6C2]"
                      required
                    />
                    <span className="text-[18px] font-sanchez text-black">
                      I'm not a robot
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                      alt="reCAPTCHA"
                      className="w-10 h-10 mb-2"
                    />
                    <span className="text-[12px] font-medium text-gray-400 -mt-1">
                      reCAPTCHA
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Privacy - Terms
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="ml-6 bg-[#55D6C2] text-black px-6 py-3 text-[16px] rounded-lg hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default NewTicket;
