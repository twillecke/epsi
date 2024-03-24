const bcrypt = require("bcrypt");
export default class CypherService {
  constructor(readonly bcrypt: any) { }

  static async encrypt(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  static async decrypt(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}