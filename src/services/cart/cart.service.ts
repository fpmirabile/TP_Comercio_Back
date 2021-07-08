import { getRepository, In } from 'typeorm'
import { CartItemDto } from '../../dto/cart/cart.dto'
import { Cart, CartItem, User } from '../../models'
import { getProduct } from '../product/product.service'
import { getUserById } from '../user/user.service'

export const createNewCartByUser = async (user: User): Promise<Cart> => {
  const cartRepository = getRepository(Cart)
  const cart = new Cart()
  cart.user = user
  return await cartRepository.save(cart)
}

export const createNewCartByUserId = async (userId: string): Promise<Cart> => {
  const cartRepository = getRepository(Cart)
  const user = await getUserById(userId)
  const cart = new Cart()
  cart.user = user
  return await cartRepository.save(cart)
}

export const getCartItemsByProductAndCart = async (
  cartId: string,
  productId: string
): Promise<CartItem | undefined> => {
  const cartRepository = getRepository(CartItem)
  const cartItems = await cartRepository.findOne({
    where: { cart: { id: cartId }, product: { id: productId } },
    relations: ['cart', 'product'],
  })
  return cartItems
}

export const getCartItemsByCart = async (
  cartId: string
): Promise<CartItem[]> => {
  const cartRepository = getRepository(CartItem)
  const cartItems = await cartRepository.find({
    where: { cart: { id: cartId } },
    relations: ['cart', 'product'],
  })
  return cartItems
}

export const getUserCart = async (userId: string): Promise<Cart> => {
  const cartRepository = getRepository(Cart)
  const user = await getUserById(userId)
  let cart = await cartRepository.findOne({
    where: { user },
    relations: ['items', 'items.product'],
  })
  if (!cart) {
    cart = await createNewCartByUserId(userId)
  }

  return cart
}

export const updateQuantityOnCartItem = async (
  prodId: string,
  userId: string,
  newQuantity: number
) => {
  const cartItemRepository = getRepository(CartItem)
  const cart = await getUserCart(userId)

  const cartItem = await getCartItemsByProductAndCart(cart.id, prodId)
  if (!cartItem) {
    throw 'CART_ITEM_NOT_FOUND'
  }

  cartItem.quantity = newQuantity
  return await cartItemRepository.save(cartItem)
}

export const addItemToCart = async (
  userId: string,
  payload: CartItemDto
): Promise<CartItem> => {
  const cartItemRepository = getRepository(CartItem)
  const cart = await getUserCart(userId)

  const cartItem = await getCartItemsByProductAndCart(cart.id, payload.prodId)
  if (!cartItem) {
    const product = await getProduct(payload.prodId)

    const cartItem: CartItem = {
      product: product,
      price: product.msrp,
      cart: cart,
      discount: product.discount,
      quantity: payload.quantity,
    }

    return await cartItemRepository.save(cartItem)
  } else {
    cartItem.quantity += payload.quantity
    return await cartItemRepository.save(cartItem)
  }
}

export const deleteItemFromCart = async (
  userId: string,
  prodId: string
): Promise<boolean> => {
  const cartItemRepository = getRepository(CartItem)
  const cart = await getUserCart(userId)
  const item = await getCartItemsByProductAndCart(cart.id, prodId)
  if (!item) {
    throw 'INVALID_DELETE_OPERATION_CART_ITEM'
  }

  const delOperation = cartItemRepository.delete({
    cart: { id: cart.id },
    product: { id: prodId },
  })
  return !!(await delOperation).affected
}

export const deleteAllProductsFromCart = async (
  cartId: string
): Promise<boolean> => {
  const cartItemRepository = getRepository(CartItem)
  const cartItems = await getCartItemsByCart(cartId)
  const prodIds = cartItems.map((i) => {
    return i.product.id
  })
  const operation = await cartItemRepository.delete({
    product: { id: In(prodIds) },
    cart: { id: cartId },
  })
  return !!operation.affected
}
