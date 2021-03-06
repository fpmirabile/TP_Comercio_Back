import express from 'express'
import { CartItemDto } from '../../dto/cart/cart.dto'
import {
  addItemToCart,
  deleteItemFromCart,
  getUserCart,
  updateQuantityOnCartItem,
} from '../../services/cart/cart.service'
import { CRUDController } from '../base.controller'

export default class CartController implements CRUDController {
  public async getAll(
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    next()
  }

  public async create(
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) {
    next()
  }

  public async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (req as any).user.id
    const request: CartItemDto = {
      prodId: req.body.prodId,
      quantity: req.body.quantity,
    }

    try {
      const newCartItems = await addItemToCart(userId, request)
      return res.status(200).send(newCartItems)
    } catch (e) {
      next(e)
    }
  }

  public async updateQuantity(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (req as any).user.id
    const request: CartItemDto = {
      prodId: req.params.id,
      quantity: req.body.quantity,
    }

    try {
      const newCartItems = await updateQuantityOnCartItem(
        request.prodId,
        userId,
        request.quantity
      )
      return res.status(200).send(newCartItems)
    } catch (e) {
      next(e)
    }
  }

  public async getOne(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = (req as any).user.id
    try {
      const cart = await getUserCart(userId)
      return res.status(200).send(cart)
    } catch (e) {
      next(e)
    }
  }

  public async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId: string = (req as any).user.id
    const prodId: string = req.params.id
    try {
      const successfulDelete = await deleteItemFromCart(userId, prodId)
      return res.status(200).send(successfulDelete)
    } catch (e) {
      next(e)
    }
  }
}
