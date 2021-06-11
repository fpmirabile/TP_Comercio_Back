import express from "express";
import OrderController from "../../controller/order/order.controller";
import { authenticated } from "../../middleware/auth";

const router = express.Router();
const controller = new OrderController();

router.get("/", authenticated, controller.getAll);

router.get("/:id", authenticated, controller.getOne);

router.post("/", authenticated, controller.create);

// router.put("/", controller.updateOrder);

// router.delete("/:id", controller.deleteOrder);

export default router;
