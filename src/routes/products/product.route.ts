import express from "express";
import ProductController from "../../controller/product/product.controller";
import { authenticated } from "../../middleware/auth";
import { isAdmin } from "../../middleware/user";

const router = express.Router();
const controller = new ProductController();

router.get("/", authenticated, controller.getAll);

router.get("/:id", authenticated, controller.getOne);

router.post("/", authenticated, isAdmin, controller.create);

router.put("/", authenticated, isAdmin, controller.update);

router.delete("/:id", authenticated, isAdmin, controller.delete);

export default router;
