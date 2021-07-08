import express from 'express'
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserById,
} from '../../services/user/user.service'
import { UserDto } from '../../dto/user/user.dto'
import { CRUDController } from '../base.controller'
import { omit } from 'lodash'

export default class UserController implements CRUDController {
  public async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const users = await getUsers()
      return res.status(200).send(users)
    } catch (e) {
      next(e)
    }
  }

  public async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request: UserDto = {
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.admin,
    }

    try {
      const user = await createUser(request)
      return res.send(user)
    } catch (e) {
      next(e)
    }
  }

  public async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request: UserDto = {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.admin,
    }

    if (!request.id) {
      return res.status(400).send()
    }

    try {
      const updatedUser = await updateUser(request.id, request)
      return res.status(200).send(updatedUser)
    } catch (e) {
      next(e)
    }
  }

  public async getOne(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params.id
    try {
      const user = await getUser(userId)
      return res.status(200).send(user)
    } catch (e) {
      next(e)
    }
  }

  public async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userId = req.params.id
    try {
      const successfulDelete = await deleteUser(userId)
      if (!successfulDelete) {
        throw 'DELETE_NOT_SUCCESSFUL'
      }

      return res.status(200).send()
    } catch (e) {
      next(e)
    }
  }

  public async me(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const user = (req as any).user
    try {
      const response = omit(user, ['password', 'createdAt', 'updatedAt'])
      return res.status(200).send(response)
    } catch (e) {
      next(e)
    }
  }
}
