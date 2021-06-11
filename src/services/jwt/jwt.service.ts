import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JwtUnsigned, JwtSigned } from "../../dto/auth/jwt.dto";

export const jwtSecret: string | undefined = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 86400; // 24 HOURS

export default class JwtService {
  createJWT(signObject: JwtUnsigned): JwtSigned {
    if (!jwtSecret) {
      throw "NO_JWT_TOKEN_CODE";
    }

    try {
      const refreshId = signObject.userId + jwtSecret;
      const salt = crypto.createSecretKey(crypto.randomBytes(16));
      const hash = crypto
        .createHmac("sha512", salt)
        .update(refreshId)
        .digest("base64");

      const token = jwt.sign(signObject, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      });
      
      return {
          token,
          refreshToken: hash,
      }
    } catch (err) {
      throw 'CANT_CREATE_JWT';
    }
  }
}
