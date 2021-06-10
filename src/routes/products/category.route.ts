import express from "express";
import CategoryController from "../../controller/category/category.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategories();
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.getCategory(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

router.put("/", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.createCategory(req.body);
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.createCategory(req.body);
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new CategoryController();
  const response = await controller.deleteCategory(req.params.id);
  if (!response) {
    res.status(404).send({ message: "something" });
  }

  return res.send(response);
});

export default router;
