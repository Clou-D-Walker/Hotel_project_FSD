import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import sendEmailNotification from "../utils/sendEmailNotification.js";
import Worker from "../models/Worker.js";

// CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// UPDATE AVAILABLE DATES
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },

        // pull means delete here
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom2 = async (req, res, next) => {
  // const hotelId = req.params.hotelid;
  const roomID = req.params.id;
  try {
    await Room.findByIdAndDelete(roomID);
    // try {
    //   await Hotel.findByIdAndUpdate(hotelId, {
    //     $pull: { rooms: req.params.id },

    //     // pull means delete here
    //   });
    // }
    // catch (err) {
    //   next(err);
    // }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET [ FETCH A ROOM]
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// GET [ FETCH ALL ROOMS]
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

////////////////////////////

export const assignRoom = async (req, res) => {
  const { workerId } = req.params;

  try {
    console.log("Worker ID received for assignment:", workerId);

    // Find the first uncleaned and unassigned room
    console.log(
      "Attempting to find the first uncleaned and unassigned room..."
    );
    const roomToAssign = await Room.findOneAndUpdate(
      { isCleaned: false, isAssigned: false }, // Room must be uncleaned and unassigned
      { isAssigned: true }, // Mark it as being assigned
      { new: true } // Return the updated room
    );

    if (!roomToAssign) {
      console.log("No uncleaned or available rooms.");
      return res.status(404).json({ message: "No uncleaned rooms available" });
    }
    console.log(
      `Found room for assignment: ${roomToAssign.title} (ID: ${roomToAssign._id})`
    );

    // Update the worker's assigned room
    console.log(`Attempting to update worker with ID: ${workerId}...`);
    const updatedWorker = await Worker.findById(workerId);
    if (!updatedWorker) {
      console.log("Worker not found.");
      // Rollback room assignment if worker update fails
      roomToAssign.isAssigned = false;
      await roomToAssign.save();
      return res.status(404).json({ message: "Worker not found" });
    }

    // Update worker with assigned room and mark as not free
    updatedWorker.assignedRoomId = roomToAssign._id;
    updatedWorker.isFree = false;
    await updatedWorker.save();

    // Send email notification to the worker
    sendEmailNotification(
      updatedWorker.email,
      roomToAssign._id,
      roomToAssign._desc
    );

    console.log(
      `Room ${roomToAssign.title} assigned to worker ${updatedWorker.name} (ID: ${updatedWorker._id})`
    );

    // Save the room as "being cleaned"
    roomToAssign.isCleaned = false; // Mark room as being cleaned
    await roomToAssign.save();

    // Schedule the room to be marked as cleaned after 30 minutes
    setTimeout(async () => {
      try {
        console.log(`Marking room ${roomToAssign.title} as cleaned...`);
        roomToAssign.isCleaned = true;
        roomToAssign.isAssigned = false; // Mark room as available again
        await roomToAssign.save();
        console.log(
          `Room ${roomToAssign.title} has been marked as cleaned and available`
        );
      } catch (err) {
        console.error(`Error marking room as cleaned: ${err.message}`);
      }
    }, 30 * 60 * 1000); // 30 minutes in milliseconds

    res.status(200).json({
      message: `Room ${roomToAssign.title} assigned to ${updatedWorker.name}`,
      worker: updatedWorker,
      room: roomToAssign,
    });
  } catch (err) {
    console.error("Error during room assignment process:", err.message);
    res.status(500).json({ message: "Error assigning room", error: err });
  }
};
