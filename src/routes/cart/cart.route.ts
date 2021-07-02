import express from "express";
import CartController from "../../controller/cart/cart.controller";
import { authenticated } from "../../middleware/auth";
import { isAdmin } from "../../middleware/user";

const router = express.Router();
const controller = new CartController();

router.get("/", authenticated, controller.getOne);

// Agregamos items al carrito
router.put("/", authenticated, controller.update);

router.put("/item/:id", authenticated, controller.updateQuantity)

router.delete("/item/:id", authenticated, controller.delete);

export default router;
