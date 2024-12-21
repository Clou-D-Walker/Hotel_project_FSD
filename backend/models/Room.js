import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    // all same except room number and no. of reserved dates by customers
    isCleaned: {
      type: Boolean,
      default: true, // Ensures the room is marked as cleaned by default
    },
    isAssigned: {
      type: Boolean,
      default: false, // Indicates if the room is assigned
    },
    // Add reference to users
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      default: null, // Indicates no one has booked the room initially
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);
