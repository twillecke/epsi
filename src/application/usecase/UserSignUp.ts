import PsychologistRepository from "../../domain/repository/PsychologistRepository";
import UserCredentials from "../../../src/domain/entity/UserCredentials";
import PsychologistProfile from "../../../src/domain/entity/PsychologistProfile";
import UserCredentialsRepository from "../../../src/domain/repository/UserCredentialsRepository";
import CypherService from "../../../src/infra/service/CypherService";

type UserSignUpInput = {
  username: string,
  password: string,
  emailAddress: string,
  role: string,
  name: string,
  birthdate: string,
  cpf: string,
  phone: string,
  city: string,
  province: string,
  address: string,
}
export default class UserSignUp {
  psychologistRepository: any;
  userCredentialsRepository: any;
  constructor(psychologistRepository: PsychologistRepository, userCredentialsRepository: UserCredentialsRepository) {
    this.psychologistRepository = psychologistRepository;
    this.userCredentialsRepository = userCredentialsRepository;
  }

  async execute(input: UserSignUpInput) {
    console.log("user sign-up", input);

    const existingUserCpf = await this.psychologistRepository.getByCpf(input.cpf);
    const existingUserEmail = await this.userCredentialsRepository.getByEmailAddress(input.emailAddress);
    const existingUsername = await this.userCredentialsRepository.getByUsername(input.username);

    if (existingUserCpf) throw new Error("Cpf already exists");
    if (existingUserEmail) throw new Error("Email already exists");
    if (existingUsername) throw new Error("Username already exists");

    const hashedPassword = await CypherService.encrypt(input.password);

    const userCredentialsOutput = await UserCredentials.create(input.username, input.emailAddress, hashedPassword, input.role);
    const psychologistProfileOutput = await PsychologistProfile.create(userCredentialsOutput.getUserId(), input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address);

    await this.userCredentialsRepository.save(userCredentialsOutput);
    await this.psychologistRepository.save(psychologistProfileOutput);

    return {
      userId: userCredentialsOutput.getUserId(),
      username: userCredentialsOutput.getUsername(),
      email_address: userCredentialsOutput.getEmailAddress(),
      role: userCredentialsOutput.getRole(),
      name: psychologistProfileOutput.getName(),
      birthdate: psychologistProfileOutput.getBirthdate(),
      cpf: psychologistProfileOutput.getCpf(),
      phone: psychologistProfileOutput.getPhone(),
      city: psychologistProfileOutput.getCity(),
      province: psychologistProfileOutput.getProvince(),
      address: psychologistProfileOutput.getAddress()
    }
  }
}