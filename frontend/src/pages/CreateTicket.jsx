import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NewTicket = () => {
  const { backendUrl } = useContext(AppContext);
  const [userData, setUserData] = useState(null);

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

  const [attachment, setAttachment] = useState(null);

  const departments = ["Technical", "Operations"];
  const categories = ["Software", "Hardware", "Access Issue", "Network"];
  const types = ["Bug", "Request", "Query", "Complaint"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const uniqueTicketNo = `T-${Date.now()}`;

    setFormData((prev) => ({
      ...prev,
      ticketNo: uniqueTicketNo,
      date: today,
      name: userData?.name || "",
      department: userData?.department || "",
    }));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const ticketData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        ticketData.append(key, value);
      });
      if (attachment) {
        ticketData.append("attachment", attachment);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/tickets/create`,
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("Ticket created successfully!");
        setFormData({
          ticketNo: `T-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          name: userData?.name || "",
          department: userData?.department || "",
          subject: "",
          category: "",
          type: "",
          priority: "",
          description: "",
        });
        setAttachment(null);
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
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 px-4 py-6 sm:px-6 md:px-10">
            <h2 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-10 text-center">
              Create New Ticket
            </h2>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-x-10 sm:gap-y-6 w-full max-w-7xl mx-auto"
              onSubmit={handleSubmit}
            >
              {/* Ticket No. */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="w-full sm:w-[130px] text-[18px] sm:text-[20px] font-sanchez text-black">
                  Ticket No.
                </label>
                <input
                  name="ticketNo"
                  type="text"
                  value={formData.ticketNo}
                  disabled
                  className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="w-full sm:w-[130px] text-[18px] sm:text-[20px] font-sanchez text-black">
                  Date
                </label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  disabled
                  className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                />
              </div>

              {/* Name */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="w-full sm:w-[130px] text-[18px] sm:text-[20px] font-sanchez text-black">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                />
              </div>

              {/* Department */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label className="w-full sm:w-[130px] text-[18px] sm:text-[20px] font-sanchez text-black">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                  required
                >
                  <option value="">Select</option>
                  {departments.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="col-span-1 md:col-span-2">
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
              <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-6 w-full md:w-1/2">
                  {[
                    {
                      label: "Category",
                      options: categories,
                      name: "category",
                    },
                    { label: "Type", options: types, name: "type" },
                    {
                      label: "Priority",
                      options: priorities,
                      name: "priority",
                    },
                  ].map(({ label, options, name }) => (
                    <div key={name}>
                      <label className="block text-[20px] font-sanchez text-black mb-1">
                        {label}
                      </label>
                      <select
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-2 rounded-[10px] shadow bg-gray-200 border border-black/10"
                        required
                      >
                        <option value="">Select</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="w-full md:w-1/2 flex flex-col relative">
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
                  <label
                    htmlFor="attachment"
                    className="absolute bottom-2 right-2 bg-[#55D6C2] p-2 rounded-md cursor-pointer"
                  >
                    <svg
                      width="17"
                      height="29"
                      viewBox="0 0 17 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4.71063C0 3.4613 0.628237 2.26313 1.74651 1.37971C2.86478 0.496297 4.38147 0 5.96294 0C7.54442 0 9.06111 0.496297 10.1794 1.37971C11.2977 2.26313 11.9259 3.4613 11.9259 4.71063V21.6689C11.9259 22.4185 11.5489 23.1374 10.878 23.6675C10.207 24.1975 9.29701 24.4953 8.34812 24.4953C7.39924 24.4953 6.48922 24.1975 5.81826 23.6675C5.1473 23.1374 4.77036 22.4185 4.77036 21.6689V8.47914C4.77036 8.22927 4.896 7.98964 5.11966 7.81295C5.34331 7.63627 5.64665 7.53701 5.96294 7.53701C6.27924 7.53701 6.58258 7.63627 6.80623 7.81295C7.02989 7.98964 7.15553 8.22927 7.15553 8.47914V21.6689C7.15553 21.9188 7.28118 22.1584 7.50484 22.3351C7.72849 22.5118 8.03183 22.611 8.34812 22.611C8.66442 22.611 8.96776 22.5118 9.19141 22.3351C9.41506 22.1584 9.54071 21.9188 9.54071 21.6689V4.71063C9.54071 4.33947 9.44817 3.97194 9.26837 3.62902C9.08857 3.28611 8.82504 2.97453 8.49281 2.71208C8.16058 2.44963 7.76617 2.24144 7.3321 2.0994C6.89802 1.95736 6.43278 1.88425 5.96294 1.88425C5.49311 1.88425 5.02787 1.95736 4.59379 2.0994C4.15972 2.24144 3.76531 2.44963 3.43308 2.71208C3.10085 2.97453 2.83732 3.28611 2.65752 3.62902C2.47772 3.97194 2.38518 4.33947 2.38518 4.71063V21.6689C2.38518 22.9182 3.01341 24.1164 4.13168 24.9998C5.24995 25.8832 6.76665 26.3795 8.34812 26.3795C9.92959 26.3795 11.4463 25.8832 12.5646 24.9998C13.6828 24.1164 14.3111 22.9182 14.3111 21.6689V8.47914C14.3111 8.22927 14.4367 7.98964 14.6604 7.81295C14.884 7.63627 15.1874 7.53701 15.5037 7.53701C15.82 7.53701 16.1233 7.63627 16.3469 7.81295C16.5706 7.98964 16.6962 8.22927 16.6962 8.47914V21.6689C16.6962 23.418 15.8167 25.0954 14.2511 26.3322C12.6856 27.569 10.5622 28.2638 8.34812 28.2638C6.13406 28.2638 4.01069 27.569 2.44511 26.3322C0.879532 25.0954 0 23.418 0 21.6689V4.71063Z"
                        fill="black"
                      />
                    </svg>
                  </label>
                  <input
                    id="attachment"
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="col-span-2 flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-4">
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
                  className="bg-[#55D6C2] text-black px-6 py-3 text-[16px] rounded-lg hover:opacity-90"
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
