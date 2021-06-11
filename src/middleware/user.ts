import express from "express";
import jwt from "jsonwebtoken";
import { JwtUnsigned } from "../dto/auth/jwt.dto";
import { getUser } from "../services/user/user.service";

export const isAdmin = [
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = (req as any).token;
    if (token) {
      const userToken = jwt.decode(token) as JwtUnsigned;
      try {
        const user = await getUser(userToken.userId)
        if (user.isAdmin) {
          return next();
        }

        return res.status(401).send();
      } catch (e) {
        return res.status(500).send({ message: e });
      }
    }

    res.status(401).send();
  },
];
