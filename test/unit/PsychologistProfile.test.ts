import PsychologistProfile from "../../src/domain/entity/PsychologistProfile";


test("Should create a psychologist", async function () {
  const input = {
    userId: "8d79ce4a-2a4a-4701-a2f8-1a63923a0778",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
  }

  const psychologistProfileOutput = PsychologistProfile.create(input.userId, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address);

  expect(psychologistProfileOutput.getUserId()).toBe("8d79ce4a-2a4a-4701-a2f8-1a63923a0778");
  expect(psychologistProfileOutput.getName()).toBe("John Doe");
  expect(psychologistProfileOutput.getBirthdate()).toBe("1994-10-01");
  expect(psychologistProfileOutput.getCpf()).toBe("45672354017");
  expect(psychologistProfileOutput.getPhone()).toBe("5548988444975");
  expect(psychologistProfileOutput.getCity()).toBe("Florianopolis");
  expect(psychologistProfileOutput.getProvince()).toBe("Santa Catarina");
  expect(psychologistProfileOutput.getAddress()).toBe("Rua das Gaivotas, 1274");
  console.log(psychologistProfileOutput);
})

test("Should not create a psychologist with invalid name", async function () {
  const input = {
    userId: "8d79ce4a-2a4a-4701-a2f8-1a63923a0778",
    name: "",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
  }
  expect(() => PsychologistProfile.create(input.userId, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address)).toThrow(new Error("Invalid name"));
})

test("Should not create a psychologist with invalid cpf", async function () {
  const input = {
    userId: "8d79ce4a-2a4a-4701-a2f8-1a63923a0778",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
  }
  expect(() => PsychologistProfile.create(input.userId, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address)).toThrow(new Error("Invalid cpf"));
})
