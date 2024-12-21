import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure email is unique
            match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // Basic email validation
        },
        assignedRoomId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Room
            ref: "Room", // Room model reference
            default: null, // Indicates no room is assigned initially
        },
        isFree: {
            type: Boolean,
            default: true, // Assume workers are free by default
        },
    },
    { timestamps: true } // Automatically handle createdAt and updatedAt fields
);

export default mongoose.model("Worker", WorkerSchema);
