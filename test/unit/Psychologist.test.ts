import Psychologist from "../../src/domain/entity/Psychologist";

test("Should create a psychologist", async function () {
  // GIVEN
  const input = {
    usename: "john_doe",
    password: "@Test123",
    name: "John Doe",
    birthdate: "01-10-1994",
    cpf: "45672354017",
    phone: "5548988444975",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  // WHEN
  const psychologist = Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address, input.emailAddress);

  // THEN  
  expect(psychologist.getUsername()).toBe("john_doe");
  expect(psychologist.getAccountId()).toBeDefined();
  expect(psychologist.getPassword()).toBe("@Test123");
  expect(psychologist.getName()).toBe("John Doe");
  expect(psychologist.getBirthdate()).toBe("01-10-1994");
  expect(psychologist.getCpf()).toBe("45672354017");
  expect(psychologist.getPhone()).toBe("5548988444975");
  expect(psychologist.getCity()).toBe("Florianopolis");
  expect(psychologist.getProvince()).toBe("Santa Catarina");
  expect(psychologist.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(psychologist.getEmailAddress()).toBe("johndoe@mail.com")
})