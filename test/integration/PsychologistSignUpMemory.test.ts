import PsychologistSignUp from "../../src/application/usecase/PsychologistSignUp";
import PsychologistRepositoryMemory from "../../src/infra/repository/PsychologistRepositoryMemory";

test("Should signup a Psychologist", async function () {
  const psychologistRepositoryMemory = new PsychologistRepositoryMemory();
  const psychologistSignup = new PsychologistSignUp(psychologistRepositoryMemory);

  const input = {
    usename: "john_doe",
    password: "@Test123",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  const outputPsychologistSignup = await psychologistSignup.execute(input);
  const storedPsychologist = await psychologistRepositoryMemory.getByPsychologistId(outputPsychologistSignup.psychologistId);

  expect(storedPsychologist?.getUsername()).toBe("john_doe");
  expect(storedPsychologist?.getPassword()).toBe("@Test123");
  expect(storedPsychologist?.getName()).toBe("John Doe");
  expect(storedPsychologist?.getBirthdate()).toBe("1994-10-01");
  expect(storedPsychologist?.getCpf()).toBe("45672354017");
  expect(storedPsychologist?.getPhone()).toBe("5548988444975");
  expect(storedPsychologist?.getCity()).toBe("Florianopolis");
  expect(storedPsychologist?.getProvince()).toBe("Santa Catarina");
  expect(storedPsychologist?.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(storedPsychologist?.getEmailAddress()).toBe("johndoe@mail.com");
});
