import { CartDto } from '../cart/cart.dto'

export interface NewOrderDto {
  comments: string
  cart: CartDto
}

export interface UpdateOrderDto {}

export interface OrderDto {
  orderId: string
}
