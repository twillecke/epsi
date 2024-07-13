/*
- Authenticate: check if login credentials (username, password) are valid
  If valid, provide JWT token
  If invalid, return error message

- Authorizate: check if JWT token is valid
  If valid, allow access
  If invalid, return error message
*/

import UserCredentialsRepository from "../../../src/domain/repository/UserCredentialsRepository";
import UserAuthenticationService from "../../../src/infra/service/AuthenticationService";
import CypherService from "../../../src/infra/service/CypherService";

type UserSignInInput = {
  username: string,
  password: string
}

export default class UserSignIn {
  userCredentialsRepository: any;
  constructor(userCredentialsRepository: UserCredentialsRepository) {
    this.userCredentialsRepository = userCredentialsRepository;
  }

  async execute(input: UserSignInInput) {
    const existingUser = await this.userCredentialsRepository.getByUsername(input.username);
    if (!existingUser) throw new Error("Invalid username or password");
    const isPasswordValid = await CypherService.compare(input.password, existingUser.getPassword());
    if (!isPasswordValid) throw new Error("Invalid username or password");
    console.log("UserSignIn", existingUser);
    const accessToken = await UserAuthenticationService.execute(existingUser.getUsername(), existingUser.getUserId());

    return {
      userId: existingUser.getUserId(),
      username: existingUser.getUsername(),
      email_address: existingUser.getEmailAddress(),
      role: existingUser.getRole(),
      accessToken: accessToken
    }
  }
}

