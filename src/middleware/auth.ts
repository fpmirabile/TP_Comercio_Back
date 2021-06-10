import express from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../services/jwt/jwt.service";
import { body, validationResult } from "express-validator";

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
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!jwtSecret) {
      return res.send();
    }

    // Necesitamos quitarle el BEARER...
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      req.token = token;
      next();
    });
  },
];
