import express from 'express';
import { getOrders, getOrder, createOrder } from "../../services/order/order";
import { Order } from "../../models";

export default class ProductController {
  public async getOrders(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const orders = getOrders();
      return res.status(200).send(orders);
    } catch (e) {
      next(e);
    }
  }

  public async createOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request = req.body;

    try {
      const order = createOrder(request);
      return res.status(200).send(order);
    } catch (e) {
      next(e);
    }
  }

  public async updateOrder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Order> {
    return new Order();
  }

  public async getOrder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Order | null> {
    return null;
  }

  public async deleteOrder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean | null> {
    return false;
  }
}
