export default abstract class User {
  createdAt: Date;
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.createdAt = new Date();
    this.username = username;
    this.password = password;
  }
}