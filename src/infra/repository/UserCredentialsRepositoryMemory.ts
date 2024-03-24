import UserCredentials from "../../../src/domain/entity/UserCredentials";
import UserCredentialsRepository from "../../../src/domain/repository/UserCredentialsRepository";
import { UserCredentialsData } from "./UserCredentialsData";
export default class UserCredentialsRepositoryMemory implements UserCredentialsRepository {
  userCredentials: UserCredentialsData[]
  constructor() {
    this.userCredentials = [];
  }

  async save(userCredentials: UserCredentials) {
    const userCredentialsData = {
      userId: userCredentials.getUserId(),
      created_at: userCredentials.getCreatedAt().toDateString(),
      email_address: userCredentials.getEmailAddress(),
      username: userCredentials.getUsername(),
      password: userCredentials.getPassword(),
      role: userCredentials.getRole()
    }
    this.userCredentials.push(userCredentialsData);
  }

  async getByUserId(userId: string) {
    const [userCredentialsData] = this.userCredentials.filter(userCredentials => userCredentials.userId === userId);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.userId, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }

  async getByUsername(username: string) {
    const [userCredentialsData] = this.userCredentials.filter(userCredentials => userCredentials.username === username);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.userId, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }

  async deleteByUserId(userId: string) {
    this.userCredentials = this.userCredentials.filter(userCredentials => userCredentials.userId !== userId);
  }

  async getByEmailAddress(emailAddress: string) {
    const userCredentialsData = this.userCredentials.find(userCredentials => userCredentials.email_address === emailAddress);
    if (!userCredentialsData) return;
    return UserCredentials.restore(userCredentialsData.userId, userCredentialsData.username, userCredentialsData.email_address, userCredentialsData.password, userCredentialsData.role);
  }
}
