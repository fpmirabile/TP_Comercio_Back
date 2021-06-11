import { getRepository } from "typeorm";
import { OrderDto } from '../../dto/order/order.dto';
import { Order, Product } from "../../models";

// export interface IUserPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

export const getOrders = async (): Promise<Array<Order>> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find();
};

export const createOrder = async (payload: OrderDto): Promise<Order> => {
  const orderRepository = getRepository(Order);
  const order = new Order();
  order.comments = payload.comments;
  
  // return orderRepository.save({
  //   ...order,
  //   ...payload,
  // });
  return order;
};

export const getOrder = async (id: number): Promise<Order | null> => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne({ id: id });
  if (!order) return null;
  return order;
};
