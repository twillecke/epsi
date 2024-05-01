import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

class UserAuthenticationService {

  constructor() { }

  static async execute(username: string, userId: string): Promise<{ accessToken: string }> {
    dotenv.config();

    const secret = process.env.JWT_SECRET || '123';
    console.log("$ ~ UserAuthenticationService ~ execute ~ process.env.JWT_SECRET as string:", process.env.JWT_SECRET as string)
    if (!secret) {
      throw new Error('JWT secret not provided');
    }

    const expirationTime = process.env.JWT_EXPIRATION_TIME || '5';
    console.log("$ ~ UserAuthenticationService ~ execute ~ process.env.JWT_EXPIRATION_TIME as string:", process.env.JWT_EXPIRATION_TIME as string)
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
}

export default UserAuthenticationService;
