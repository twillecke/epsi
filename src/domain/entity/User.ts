import Password from "../vo/Password";
import Username from "../vo/Username";
export default abstract class User {
  createdAt: Date;
  username: Username;
  password: Password;

  constructor(username: string, password: string) {
    this.createdAt = new Date();
    this.username = new Username(username);
    this.password = new Password(password);
  }
}