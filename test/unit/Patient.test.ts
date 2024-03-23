import Patient from "../../src/domain/entity/Patient";

test("Should create a patient", async function () {
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  const patient = Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress);

  expect(patient.patientId).toBeDefined();
  expect(patient.getPsychologistId()).toBe("9c7f4683-094f-4302-bedd-0725e056cd27");
  expect(patient.getName()).toBe("John Doe");
  expect(patient.getBirthdate()).toBe("1994-10-01");
  expect(patient.getCpf()).toBe("45672354017");
  expect(patient.getPhone()).toBe("5548988444975");
  expect(patient.getEmergencyPhone()).toBe("48998753364");
  expect(patient.getCity()).toBe("Florianopolis");
  expect(patient.getProvince()).toBe("Santa Catarina");
  expect(patient.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(patient.getEmailAddress()).toBe("johndoe@mail.com")
})

test("Should not create a patient with invalid name", async function () {
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: "johndoe@mail.com"
  }
  expect(() => Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress)).toThrow(new Error("Invalid name"));
})

test("Should not create a patient with invalid birthdate", async function () {
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
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "1994-10-01",
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

test("Should not create a patient with invalid email address", async function () {
  const input = {
    psychologistId: "9c7f4683-094f-4302-bedd-0725e056cd27",
    name: "John Doe",
    birthdate: "1994-10-01",
    cpf: "45672354017",
    phone: "5548988444975",
    emergencyPhone: "48998753364",
    city: "Florianopolis",
    province: "Santa Catarina",
    address: "Rua das Gaivotas, 1274",
    emailAddress: ""
  }
  expect(() => Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress)).toThrow(new Error("Invalid email"));
})