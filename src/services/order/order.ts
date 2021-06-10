import { getRepository } from "typeorm";
import { Order } from "../../models";

// export interface IUserPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

export const getOrders = async (): Promise<Array<Order>> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find();
};

export const createOrder = async (payload: Object): Promise<Order> => {
  const orderRepository = getRepository(Order);
  const order = new Order();
  return orderRepository.save({
    ...order,
    ...payload,
  });
};

export const getOrder = async (id: number): Promise<Order | null> => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne({ id: id });
  if (!order) return null;
  return order;
};
