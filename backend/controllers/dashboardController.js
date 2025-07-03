import Ticket from "../models/ticketModel.js"; // Assume this exists

export const getDashboardStats = async (req, res) => {
  try {
    const { role } = req.user; // Comes from token after auth

    // Generic stats (all users can see)
    const totalTickets = await Ticket.countDocuments({});
    const totalSolved = await Ticket.countDocuments({ status: "solved" });
    const awaitingApproval = await Ticket.countDocuments({
      status: "awaiting",
    });
    const inProgress = await Ticket.countDocuments({ status: "in-progress" });

    // Role-based (optional)
    let technicalCount = 0;
    let operationCount = 0;

    if (role === "admin" || role === "technical") {
      technicalCount = await Ticket.countDocuments({ department: "technical" });
    }

    if (role === "admin" || role === "operation") {
      operationCount = await Ticket.countDocuments({ department: "operation" });
    }

    return res.json({
      success: true,
      stats: {
        totalTickets,
        totalSolved,
        awaitingApproval,
        inProgress,
        technicalCount,
        operationCount,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
