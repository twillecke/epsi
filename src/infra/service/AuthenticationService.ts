import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

class UserAuthenticationService {

  constructor() { }

  static async execute(username: string, userId: string): Promise<{ accessToken: string }> {
    dotenv.config();

    const secret = process.env.JWT_SECRET || '123';
    if (!secret) {
      throw new Error('JWT secret not provided');
    }

    const expirationTime = process.env.JWT_EXPIRATION_TIME || '5000';
    if (!expirationTime) {
      throw new Error('JWT expiration time not provided');
    }

    const expiresIn = parseInt(expirationTime, 10);
    if (isNaN(expiresIn)) {
      throw new Error('Invalid JWT expiration time');
    }

    const accessToken = jwt.sign(
      { user_id: userId, username: username },
      secret,
      { expiresIn: expiresIn },
    );

    return {
      accessToken: accessToken,
    };
  }
  static async verify(authorizationHeader: string): Promise<{ userId: string, username: string }> {
    dotenv.config();

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new Error('Invalid authorization header format');
    }

    const accessToken = tokenParts[1];
    console.log("$ ~ UserAuthenticationService ~ verify ~ accessToken:", accessToken, typeof(accessToken))
    const secret = process.env.JWT_SECRET || '123';
    if (!secret) {
      throw new Error('JWT secret not provided');
    }

    const decoded = jwt.verify(accessToken, secret) as { user_id: string, username: string };
    return {
      userId: decoded.user_id,
      username: decoded.username,
    };
  }
}

export default UserAuthenticationService;
