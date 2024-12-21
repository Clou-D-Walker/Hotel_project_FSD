import express from "express"
import {
    getWorkers,
    addWorker
} from "../controllers/worker.js";

const router = express.Router();

router.get("/",getWorkers);
router.post("/",addWorker);

export default router;