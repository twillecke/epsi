import UserSignUp from "../../src/application/usecase/UserSignUp";
import UserCredentialsRepositoryDatabase from "../../src/infra/repository/UserCredentialsRepositoryDatabase";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import PsychologistRepositoryDatabase from "../../src/infra/repository/PsychologistRepositoryDatabase";

test("Should sign up a user in database", async function () {
  const connection = new PgPromiseAdapter();
  const userCredentialsRepositoryDatabase = new UserCredentialsRepositoryDatabase(connection);
  const psychologistRepositoryDatabase = new PsychologistRepositoryDatabase(connection);
  const userSignUp: UserSignUp = new UserSignUp(psychologistRepositoryDatabase, userCredentialsRepositoryDatabase);

  const input = {
    username: "johndoe",
    password: "@Test123",
    emailAddress: "johndoe@mail.com",
    role: "PSYCHOLOGIST",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
  }

  const userSignUpOutput = await userSignUp.execute(input);

  const storedUserCredentials = await userCredentialsRepositoryDatabase.getByUserId(userSignUpOutput.userId);
  const storedPsychologist = await psychologistRepositoryDatabase.getByUserId(userSignUpOutput.userId);

  expect(storedUserCredentials?.getUsername()).toBe("johndoe");
  expect(storedUserCredentials?.getRole()).toBe("PSYCHOLOGIST");
  expect(storedUserCredentials?.getEmailAddress()).toBe("johndoe@mail.com");
  expect(storedPsychologist?.getName()).toBe("John Doe");
  expect(storedPsychologist?.getBirthdate()).toBe("1994-10-01");
  expect(storedPsychologist?.getCpf()).toBe("45672354017");
  expect(storedPsychologist?.getPhone()).toBe("5548988444975");
  expect(storedPsychologist?.getCity()).toBe("Florianopolis");
  expect(storedPsychologist?.getProvince()).toBe("Santa Catarina");
  expect(storedPsychologist?.getAddress()).toBe("Rua das Gaivotas, 1274");

  await userCredentialsRepositoryDatabase.deleteByUserId(userSignUpOutput.userId);
  await psychologistRepositoryDatabase.deleteByUserId(userSignUpOutput.userId);
  connection.close();
})