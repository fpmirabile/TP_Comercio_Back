import express from 'express';
import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../../services/user/user.service";
import { UserDto } from "../../dto/user/user.dto";

export default class UserController {

  public async getUsers(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const users = await getUsers();
      return res.status(200).send(users);
    } catch (e) {
      next(e);
    }
  }

  public async createUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: UserDto = {
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.admin,
    };

    try {
      const user = await createUser(request)
      return res.send(user);
    } catch (e) {
      next(e);
    }
  }

  public async updateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: UserDto = {
      id: req.body.id,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.admin,
    };

    if (!request.id) {
      return res.status(400).send(); 
    }

    try {
      const updatedUser = await updateUser(request.id, request);
      return res.status(200).send(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  public async getUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId = req.params.id;
    try {
      const user = await getUser(userId);
      return res.status(200).send(user);
    } catch (e) {
      next(e);
    }
  }

  public async deleteUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userId = req.params.id;
    try {
      const successfulDelete = await deleteUser(userId);
      if (!successfulDelete) {
        throw 'DELETE_NOT_SUCCESSFUL';
      }

      return res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
}
