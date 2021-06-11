import express from "express";
import ProductController from "../../controller/product/product.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  // const controller = new ProductController();
  // const response = await controller.getProducts();
  // return res.send(response);
});

router.get("/:id", async (req, res) => {
  // const controller = new ProductController();
  // const response = await controller.getProduct(req.params.id);
  // if (!response) res.status(404).send({ message: "No user found" });
  // return res.send(response);
});

router.put("/", async (req, res) => {
  // const controller = new ProductController();
  // const response = await controller.createProduct(req.body);
  // return res.send(response);
});

router.post("/", async (req, res) => {
  // const controller = new ProductController();
  // const response = await controller.createProduct(req.body);
  // return res.send(response);
});

router.delete("/:id", async (req, res) => {
  // const controller = new ProductController();
  // const response = await controller.deleteProduct(req.params.id);
  // if (!response) {
  //   res.status(404).send({ message: "something" });
  // }

  // return res.send(response);
});

export default router;
