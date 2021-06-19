import { getRepository } from "typeorm";
import { NewOrderDto } from '../../dto/order/order.dto';
import { CartItem, Order, OrderItem } from "../../models";
import { OrderStatus } from "../../models/orders/order";
import { getCartItems } from "../cart/cart.service";
import { getUser } from "../user/user.service";

export const getOrders = async (): Promise<Array<Order>> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find();
};

export const createOrder = async (payload: NewOrderDto, userId: string): Promise<Order> => {
  const orderRepository = getRepository(Order);
  
  // Guardo primero la orden...
  const order = await orderRepository.save({
    status: OrderStatus.CREATED,
    user: await getUser(userId),
    comments: payload.comments,
  });

  // Guardo el detalle, necesito una row generada para lograr esto...
  orderRepository.save({
    ...order,
    details: transformCartItemToOrderItem(await getCartItems(payload.cart.cartId), order),
  });

  return order;
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne({ id: id });
  if (!order) {
    throw 'ORDER_NOT_FOUND';
  }

  return order;
};


const transformCartItemToOrderItem = (cartItems: CartItem[], order: Order): OrderItem[] => {
  const details: OrderItem[] = [];
  cartItems.forEach((cartItem) => {
    const orderItem = OrderItem.fromCartItem(cartItem, order);
    details.push(orderItem);
  });

  return details;
}