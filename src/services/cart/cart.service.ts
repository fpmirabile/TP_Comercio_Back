import { getRepository } from "typeorm";
import { CartItemDto } from "../../dto/cart/cart.dto";
import { Cart, CartItem } from "../../models";
import { getProduct } from "../product/product.service";

export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({ id: cartId });
  if (!cart) {
    throw 'CART_NOT_FOUND';
  }

  return cart.items;
}

export const getUserCart = async (userId: string): Promise<Cart> => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne({ where: { user: { id: userId } } });
  if (!cart) {
    throw 'CART_NOT_FOUND';
  }

  return cart;
}

export const addNewItemToCart = async (userId: string, payload: CartItemDto): Promise<CartItem[]> => {
  const cartRepository = getRepository(Cart);
  const cart = await getUserCart(userId);
  if (!cart) {
    throw 'CART_NOT_FOUND';
  }

  const product = await getProduct(payload.prodId);
  const item = cart.items.find(item => item.product.id === payload.prodId);
  if (!item) {
    const cartItem = new CartItem();
    cartItem.product = product;
    cartItem.cart = cart;
    cartItem.discount = 0;
    cartItem.quantity = payload.quantity;
    cart.items.push(cartItem);
    const newCart = await cartRepository.save(cart);
    return newCart.items;
  } else {
    item.quantity += payload.quantity;
    const cartItemRepository = getRepository(CartItem);
    cartItemRepository.save(item);
    return await getCartItems(cart.id);
  }
}

export const deleteItemFromCart = async (userId: string, prodId: string): Promise<boolean> => {
  const cartRepository = getRepository(CartItem);
  const cart = await getUserCart(userId);
  const item = cart.items.find(i => i.product.id === prodId);
  if (!item) {
    throw 'INVALID_DELETE_OPERATION_CART_ITEM';
  }

  const delOperation = cartRepository.delete({ cart: { id: cart.id }, product: { id: prodId }})
  return !!(await delOperation).affected;
}