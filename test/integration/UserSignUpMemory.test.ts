import UserCredentialsRepositoryMemory from "../../src/infra/repository/UserCredentialsRepositoryMemory";
import UserCredentials from "../../src/domain/entity/UserCredentials";
import PsychologistProfile from "../../src/domain/entity/PsychologistProfile";
import PsychologistRepositoryMemory from "../../src/infra/repository/PsychologistRepositoryMemory";
import UserSignUp from "../../src/application/usecase/UserSignUp";

test("Should sign up a user in memory", async function () {
  const userCredentialsRepositoryMemory = new UserCredentialsRepositoryMemory();
  const psychologistRepositoryMemory = new PsychologistRepositoryMemory();
  const userSignUp: UserSignUp = new UserSignUp(psychologistRepositoryMemory, userCredentialsRepositoryMemory);

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

  const storedUserCredentials = await userCredentialsRepositoryMemory.getByUserId(userSignUpOutput.userId);
  const storedPsychologist = await psychologistRepositoryMemory.getByUserId(userSignUpOutput.userId);

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
  console.log(storedUserCredentials, storedPsychologist);

})