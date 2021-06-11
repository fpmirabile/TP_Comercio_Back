import express from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../services/jwt/jwt.service";
import { body, validationResult } from "express-validator";
import { JwtUnsigned } from "../dto/auth/jwt.dto";
import { getUser } from "../services/user/user.service";

export const validateLogin = [
  body("email").isEmail().notEmpty(),
  body("password").isStrongPassword(),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

export const authenticated = [
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!jwtSecret) {
      return res.send();
    }

    const token = req.headers["authorization"];
    if (!token) {
      console.log('invalid token', token);
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, jwtSecret, async (err) => {
      if (err) {
        console.log('error token', err);
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      try {
        const userToken = jwt.decode(token) as JwtUnsigned;
        const user = await getUser(userToken.userId);
        (req as any).user = user;
        next();
      } catch (e) {
        console.log('couldn\'t decode jwt');
        return res.status(500).send({ message: e });
      }
    });
  },
];
