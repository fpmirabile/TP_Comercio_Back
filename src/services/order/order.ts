import { getRepository } from "typeorm";
import { NewOrderDto } from '../../dto/order/order.dto';
import { CartItem, Order, OrderItem } from "../../models";
import { OrderStatus } from "../../models/orders/order";
import { deleteAllProductsFromCart, deleteItemFromCart, getCartItemsByCart, getUserCart } from "../cart/cart.service";
import { getProduct, updateProduct } from "../product/product.service";
import { getUser } from "../user/user.service";

export const getOrders = async (): Promise<Array<Order>> => {
  const orderRepository = getRepository(Order);
  return orderRepository.find({ relations: ['details', 'user', 'details.product'] });
};

export const createOrder = async (payload: NewOrderDto, userId: string): Promise<Order> => {
  const orderRepository = getRepository(Order);
  console.log(userId);
  // Guardo primero la orden...
  const order = await orderRepository.save({
    status: OrderStatus.CREATED,
    user: await getUser(userId),
    comments: payload.comments,
  });

  const items = await createOrderDetail(order, userId);
  items.forEach( async (i) => {
    const prod = await getProduct(i.product.id);
    prod.soldQuantity += i.quantity;
    prod.stock -= i.quantity;
    await updateProduct(prod);
  });
  return await getOrder(order.id);
};

const createOrderDetail = async (order: Order, userId: string): Promise<OrderItem[]> => {
  const orderItemRepository = getRepository(OrderItem);
  const cart = await getUserCart(userId);
  const cartItems = await getCartItemsByCart(cart.id);

  const details: OrderItem[] = [];
  cartItems.forEach(async (cartItem: CartItem) => {
    const orderItem = OrderItem.fromCartItem(cartItem, order);
    details.push(orderItem);
  });

  const delCartsOp = await deleteAllProductsFromCart(cart.id);
  if (!delCartsOp) {
    throw 'COULDN\'T_DELETE_CART_ITEMS';
  }

  const items = await orderItemRepository.save(details);
  return items;
}

export const getOrder = async (id: string): Promise<Order> => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne({ where: { id: id }, relations: [ 'details', 'details.user']  });
  if (!order) {
    throw 'ORDER_NOT_FOUND';
  }

  return order;
};