import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import {
  verifyAdmin,
  verifyModerator,
  verifyToken,
  verifyUser,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello admin, you are logged in and you can delete all accounts");
});
router.get("/checkmod/:id", verifyModerator, (req, res, next) => {
  res.send(
    "hello moderator, you are logged in and you can delete all accounts"
  );
});

//GET ALL
// router.get("/", verifyAdmin, getUsers);
router.get("/", getUsers);

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

router.get("/mod", verifyModerator, getUsers);
// moderator can also fetch all hotels

export default router;
