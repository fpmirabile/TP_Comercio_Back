import express from "express";
import UserController from "../../controller/user/user.controller";
import { authenticated } from "../../middleware/auth";
import { isAdmin } from "../../middleware/user";

const router = express.Router();

const controller = new UserController();

router.get("/", authenticated, isAdmin, controller.getUsers);

router.get("/:id", authenticated, isAdmin, controller.getUser);

router.post("/", authenticated, isAdmin, controller.createUser);

router.put("/:id", authenticated, controller.updateUser)

router.delete("/:id", authenticated, isAdmin, controller.deleteUser);

export default router;
