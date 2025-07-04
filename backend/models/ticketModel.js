import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketNo: { type: String, required: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    subject: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    priority: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "In Progress" },
    rating: { type: Number, default: 0 },
    supportBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachment: {
      data: Buffer,
      contentType: String,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);
