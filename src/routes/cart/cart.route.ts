import express from "express";
import CartController from "../../controller/cart/cart.controller";
import { authenticated } from "../../middleware/auth";
import { isAdmin } from "../../middleware/user";

const router = express.Router();
const controller = new CartController();

router.get("/", authenticated, controller.getOne);

// Agregamos items al carrito
router.put("/", authenticated, isAdmin, controller.update);

// La unica funcionalidad que va a aceptar este endpoint es delete de items
router.delete("/item/:id", authenticated, isAdmin, controller.delete);

export default router;
