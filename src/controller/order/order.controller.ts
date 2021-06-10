import express from 'express';
import { Order } from "../../models";

export default class ProductController {
  public async getOrders(): Promise<Array<Order>> {
    return [];
  }

  public async createOrder(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Order> {
    return new Order();
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
