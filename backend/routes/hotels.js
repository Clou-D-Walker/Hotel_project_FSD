import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin, verifyModerator } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
// router.post("/", verifyAdmin, createHotel);
router.post("/", createHotel);
// router.post("/mod", verifyModerator, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// router.put("/mod/:id", verifyModerator, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// router.delete("/mod/:id", verifyModerator, deleteHotel);

//GET

router.get("/find/:id", getHotel);

// public api everyone can fetch the specific hotel or all the hotels

//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
