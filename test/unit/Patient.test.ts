import Patient from "../../src/domain/entity/Patient";

test("Should create a patient", async function () {
  // GIVEN
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "01-10-1994",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  // WHEN
  const patient = Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress);

  // THEN
  expect(patient.accountId).toBeDefined();
  expect(patient.psychologistId).toBe("9c7f4683-094f-4302-bedd-0725e056cd27");
  expect(patient.name.getValue()).toBe("John Doe");
  expect(patient.birthdate.getValue()).toBe("01-10-1994");
  expect(patient.cpf.getValue()).toBe("45672354017");
  expect(patient.phone).toBe("5548988444975");
  expect(patient.emergencyPhone).toBe("48998753364");
  expect(patient.city).toBe("Florianopolis");
  expect(patient.province).toBe("Santa Catarina");
  expect(patient.address).toBe("Rua das Gaivotas, 1274");
  expect(patient.emailAddress).toBe("johndoe@mail.com")
})

test("Should not create a patient with invalid name", async function () {
  // GIVEN
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "",
    birthdate: "01-10-1994",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  // WHEN
  expect(() => Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress)).toThrow(new Error("Invalid name"));
})

test("Should not create a patient with invalid birthdate", async function () {
  // GIVEN
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress)).toThrow(new Error("Invalid birthdate"));
})

test("Should not create a patient with invalid cpf", async function () {
  // GIVEN
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "01-10-1994",
    cpf: "123",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress)).toThrow(new Error("Invalid cpf"));
})