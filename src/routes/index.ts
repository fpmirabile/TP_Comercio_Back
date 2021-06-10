import express from "express";
import AuthRouter from "./auth/auth.route";
import UserRouter from "./user/user.route";
import ProductRouter from "./products/product.route";
import OrderRouter from "./orders/order.route";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/users", UserRouter);
router.use("/products", ProductRouter);
// router.use('/category', CategoryRouter);
// router.use('/payments', PaymentRouter);
router.use("/orders", OrderRouter);

export default router;