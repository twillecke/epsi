import Psychologist from "../../src/domain/entity/Psychologist";

test.only("Should create a psychologist", async function () {
  // GIVEN
  const input = {
    usename: "john_doe",
    password: "123test",
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
  const patient = Psychologist.create(input.usename, input.password, input.name, input.birthdate, input.cpf, input.phone, input.city, input.province, input.address, input.emailAddress);
  console.log("$ ~ patient:", patient)

  // THEN  
  expect(patient.username).toBeDefined();

  expect(patient.accountId).toBeDefined();
  expect(patient.getName()).toBe("John Doe");
  expect(patient.birthdate.getValue()).toBe("01-10-1994");
  expect(patient.cpf.getValue()).toBe("45672354017");
  expect(patient.phone).toBe("5548988444975");
  expect(patient.city).toBe("Florianopolis");
  expect(patient.province).toBe("Santa Catarina");
  expect(patient.address).toBe("Rua das Gaivotas, 1274");
  expect(patient.emailAddress).toBe("johndoe@mail.com")
})