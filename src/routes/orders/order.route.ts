import express from "express";
import OrderController from "../../controller/order/order.controller";

const router = express.Router();
const controller = new OrderController();

router.get("/", controller.getOrders);

router.get("/:id", async (req, res) => {
  // const controller = new OrderController();
  // const response = await controller.getOrder(req.params.id);
  // if (!response) res.status(404).send({ message: "No user found" });
  // return res.send(response);
});

router.put("/", async (req, res) => {
  // const controller = new OrderController();
  // const response = await controller.createOrder(req.body);
  // return res.send(response);
});

router.post("/", async (req, res) => {
  // const controller = new OrderController();
  // const response = await controller.createOrder(req.body);
  // return res.send(response);
});

router.delete("/:id", async (req, res) => {
  // const controller = new OrderController();
  // const response = await controller.deleteOrder(req.params.id);
  // if (!response) {
  //   res.status(404).send({ message: "something" });
  // }

  // return res.send(response);
});

export default router;
