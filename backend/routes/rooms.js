import express from "express";
import {
  createRoom,
  deleteRoom,
  deleteRoom2,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyModerator } from "../utils/verifyToken.js";
import { assignRoom } from "../controllers/room.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
router.post("/mod/:hotelid", verifyModerator, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
router.put("/mod/:id", verifyModerator, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
router.delete("/:id", verifyAdmin, deleteRoom2);
router.delete("/mod/:id/:hotelid", verifyModerator, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

router.post("/assign/:workerId", assignRoom);

export default router;
