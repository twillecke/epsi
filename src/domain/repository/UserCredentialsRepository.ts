import UserCredentials from "../entity/UserCredentials";

export default interface UserCredentialsRepository {
  save(psychologistProfile: UserCredentials): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
  getByUserId(userId: string): Promise<UserCredentials | undefined>;
  getByEmailAddress(emailAddress: string): Promise<UserCredentials | undefined>;
  getByUsername(username: string): Promise<UserCredentials | undefined>;
}