import UserCredentialsRepositoryMemory from "../../src/infra/repository/UserCredentialsRepositoryMemory";
import PsychologistRepositoryMemory from "../../src/infra/repository/PsychologistRepositoryMemory";
import UserSignUp from "../../src/application/usecase/UserSignUp";
import UserSignIn from "../../src/application/usecase/UserSignIn";

test("Should sign in user in memory", async function () {
  const userCredentialsRepositoryMemory = new UserCredentialsRepositoryMemory();
  const psychologistRepositoryMemory = new PsychologistRepositoryMemory();
  const userSignUp: UserSignUp = new UserSignUp(psychologistRepositoryMemory, userCredentialsRepositoryMemory);
  const userSignIn: UserSignIn = new UserSignIn(userCredentialsRepositoryMemory);


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

  // creates user
  const userSignUpOutput = await userSignUp.execute(input);

  // sign in user
  const userSignInOutput = await userSignIn.execute({
    username: input.username,
    password: input.password
  });

  expect(userSignInOutput.userId).toBe(userSignUpOutput.userId);
  expect(userSignInOutput.username).toBe(input.username);
  expect(userSignInOutput.email_address).toBe(input.emailAddress);
  expect(userSignInOutput.role).toBe(input.role);
  expect(userSignInOutput.accessToken).toBeDefined();
  console.log(userSignInOutput);
})