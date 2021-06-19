import express from "express";
import CategoryController from "../../controller/category/category.controller";
import { authenticated } from "../../middleware/auth";
import { isAdmin } from "../../middleware/user";

const router = express.Router();
const controller = new CategoryController();

router.get("/", authenticated, controller.getAll);

router.get("/:id", authenticated, controller.getOne);

router.put("/", authenticated, isAdmin, controller.update);

router.post("/", authenticated, isAdmin, controller.create);

router.delete("/:id", authenticated, isAdmin, controller.delete);

export default router;
