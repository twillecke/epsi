import Psychologist from "../../src/domain/entity/Psychologist";

test("Should create a psychologist", async function () {
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

  const psychologistOutput = Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address);

  expect(psychologistOutput.getUsername()).toBe("john_doe");
  expect(psychologistOutput.getPsychologistId()).toBeDefined();
  expect(psychologistOutput.getPassword()).toBe("@Test123");
  expect(psychologistOutput.getName()).toBe("John Doe");
  expect(psychologistOutput.getBirthdate()).toBe("1994-10-01");
  expect(psychologistOutput.getCpf()).toBe("45672354017");
  expect(psychologistOutput.getPhone()).toBe("5548988444975");
  expect(psychologistOutput.getCity()).toBe("Florianopolis");
  expect(psychologistOutput.getProvince()).toBe("Santa Catarina");
  expect(psychologistOutput.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(psychologistOutput.getEmailAddress()).toBe("johndoe@mail.com")
})

test("Should not create a psychologist with invalid username", async function () {
  const input = {
    usename: "",
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
  expect(() => Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address)).toThrow(new Error("Invalid username"));
})

test("Should not create a psychologist with invalid password", async function () {
  const input = {
    usename: "john_doe",
    password: "",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address)).toThrow(new Error("Invalid password"));
})

test("Should not create a psychologist with invalid name", async function () {
  const input = {
    usename: "john_doe",
    password: "@Test123",
    name: "",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address)).toThrow(new Error("Invalid name"));
})

test("Should not create a psychologist with invalid cpf", async function () {
  const input = {
    usename: "john_doe",
    password: "@Test123",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address)).toThrow(new Error("Invalid cpf"));
})

test("Should not create a psychologist with invalid email address", async function () {
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
    emailAddress: ""
  }
  expect(() => Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.emailAddress, input.address)).toThrow(new Error("Invalid email"));
})