import Ticket from "../models/ticketModel.js";

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const {
      ticketNo,
      date,
      name,
      department,
      subject,
      category,
      type,
      priority,
      description,
    } = req.body;

    const createdBy = req.userId;

    const newTicket = new Ticket({
      ticketNo,
      date,
      name,
      department,
      subject,
      category,
      type,
      priority,
      description,
      createdBy,
    });

    await newTicket.save();
    res.status(201).json({ success: true, ticket: newTicket });
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ success: false, message: "Ticket creation failed" });
  }
};

// Fetch tickets created by the logged-in user
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.userId })
      .populate("supportBy", "name email") // 👈 gets name and email
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tickets });
  } catch (error) {
    console.error("Fetch Tickets Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch tickets",
    });
  }
};
