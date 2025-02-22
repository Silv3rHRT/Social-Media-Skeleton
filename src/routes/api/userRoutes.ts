import { Router } from "express";
import {
  addFriend,
  createUser,
  deleteFriend,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

export default router;
