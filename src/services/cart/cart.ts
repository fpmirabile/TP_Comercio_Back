import { getRepository } from "typeorm";
import { Cart, CartItem } from "../../models";

export const getCartItems = async (cartId: string): Promise<CartItem[]> => {
    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({ id: cartId });
    if (!cart) {
        throw 'CART_NOT_FOUND';
    }

    return cart?.items;
}