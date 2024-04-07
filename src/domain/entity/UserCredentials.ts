import Email from "../vo/Email";
import Password from "../vo/Password";
import Username from "../vo/Username";

export default class UserCredentials {
  userId: string;
  readonly createdAt: Date;
  username: Username;
  password: Password;
  emailAddress: Email;
  role: string;

  private constructor(userId: string, username: string, emailAdress: string, password: string, role: string) {
    this.userId = userId;
    this.createdAt = new Date();
    this.emailAddress = new Email(emailAdress);
    this.username = new Username(username);
    this.password = new Password(password);
    this.role = role;
  }

  static create(username: string, emailAdress: string, password: string, role: string) {
    const userId = crypto.randomUUID();
    return new UserCredentials(userId, username, emailAdress, password, role);
  }

  static restore(userId: string, username: string, emailAdress: string, password: string, role: string) {
    return new UserCredentials(userId, username, emailAdress, password, role);
  }
  getUserId() { return this.userId; }
  getCreatedAt() { return this.createdAt; }
  getUsername() { return this.username.getValue(); }
  getEmailAddress() { return this.emailAddress.getValue(); }
  getPassword() { return this.password.getValue(); }
  getRole() { return this.role; }
}