import express from 'express'
import { LoginRequestDto } from '../../dto/auth/login.dto'
import { RegisterRequestDto } from '../../dto/auth/register.dto'
import {
  doLogin,
  registerUser,
  resetPassword,
} from '../../services/user/user.service'

export default class AuthenticationService {
  public async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const loginRequest: LoginRequestDto = {
      email: req.body.email,
      password: req.body.password,
    }

    try {
      const response = await doLogin(loginRequest)
      return res.status(200).send(response)
    } catch (e) {
      next(e)
    }
  }

  public async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request: RegisterRequestDto = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    }

    try {
      const user = await registerUser(request)
      // TODO: Send an email ?
      return res.status(201).send({ email: user.email })
    } catch (e) {
      next(e)
    }
  }

  public async changePassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request = {
      email: req.body.email,
    }

    try {
      const operation = await resetPassword(request.email)
      return res.status(200).json({ operation })
    } catch (e) {
      next(e)
    }
  }
}
