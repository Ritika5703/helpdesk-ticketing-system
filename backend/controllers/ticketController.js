import Ticket from "../models/ticketModel.js";
import userModel from "../models/userModel.js";

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
    const attachment = req.file;

    // Basic validation
    if (
      !ticketNo ||
      !date ||
      !name ||
      !department ||
      !subject ||
      !category ||
      !type ||
      !priority ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const user = await userModel.findById(createdBy);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid user. Please login again.",
      });
    }

    const ticketData = new Ticket({
      ticketNo,
      date: new Date(date),
      name,
      department,
      subject,
      category,
      type,
      priority,
      description,
      createdBy,
    });
    if (attachment) {
      ticketData.attachment = {
        data: attachment.buffer,
        contentType: attachment.mimetype,
      };
      const newTicket = new Ticket(ticketData);

      await newTicket.save();
      res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        ticket: newTicket,
      });
    }
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
