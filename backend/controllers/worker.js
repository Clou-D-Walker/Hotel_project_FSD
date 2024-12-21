import Worker from "../models/Worker.js"

export const getWorkers = async (req, res, next) => {
    try {
        const workers = await Worker.find().populate("assignedRoomId", "title");
        res.status(200).json(workers);
    } catch (err) {
        next(err);
    }
}

export const addWorker = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        if (!name || !email) {
            res.status(400).json({ message: "Name and email are required" });
        }

        const newWorker = new Worker({
            name, email
        });
        const savedWorker = await newWorker.save();

        res.status(201).json(savedWorker);
    } catch (err) {
        next(err);
    }
}

