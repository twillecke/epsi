import UserCredentials from "../../domain/entity/UserCredentials";
import UserCredentialsRepository from "../../domain/repository/UserCredentialsRepository";
import DatabaseConnection from "../database/DatabaseConnection";

export default class UserCredentialsRepositoryMemory implements UserCredentialsRepository {
  constructor(readonly connection: DatabaseConnection) {
  }

  async save(userCredentials: UserCredentials) {
    await this.connection.query("insert into epsi.user_credentials (user_id, created_at, email_address, username, password, role) values ($1, $2, $3, $4, $5, $6)",
      [userCredentials.userId, userCredentials.getCreatedAt().toDateString(), userCredentials.getEmailAddress(), userCredentials.getUsername(), userCredentials.getPassword(), userCredentials.getRole()]);
  }

  async getByUserId(userId: string) {
    const [userCredentialsData] = await this.connection.query("SELECT user_id, created_at, email_address, username, password, role FROM epsi.user_credentials WHERE user_id = $1", [userId]);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.user_id, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }

  async getByUsername(username: string) {
    const [userCredentialsData] = await this.connection.query("select user_id, created_at, email_address, username, password, role from epsi.user_credentials where username = $1", [username]);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.userId, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }

  async deleteByUserId(userId: string) {
    await this.connection.query("delete from epsi.user_credentials where user_id = $1", [userId]);
  }

  async getByEmailAddress(emailAddress: string) {
    const [userCredentialsData] = await this.connection.query("select user_id, created_at, email_address, username, password, role from epsi.user_credentials where email_address = $1", [emailAddress]);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.user_id, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }
}
