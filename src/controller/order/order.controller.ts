import express from 'express';
import { getOrders, getOrder, createOrder } from "../../services/order/order";
import { Order } from "../../models";
import { NewOrderDto, OrderDto } from '../../dto/order/order.dto';
import { CRUDController } from '../base.controller';

export default class OrderController implements CRUDController {
  public async getAll(_req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const orders = await getOrders();
      return res.status(200).send(orders);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request = req.body as NewOrderDto;
    const userId = (req as any).user.id;

    try {
      const order = await createOrder(request, userId);
      return res.status(200).send(order);
    } catch (e) {
      next(e);
    }
  }

  public async update(_req: express.Request, _res: express.Response, next: express.NextFunction) {
    // TODO: El admin quizas puede editar la orden, pero no el usuario
    next();
  }

  public async getOne(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: OrderDto = {
      orderId: req.params.id,
    }

    try {
      const order = await getOrder(request.orderId);
      return res.status(200).send(order);
    } catch (e) {
      next(e);
    }
  }

  public async delete(_req: express.Request, _res: express.Response, next: express.NextFunction) {
    next();
  }
}
