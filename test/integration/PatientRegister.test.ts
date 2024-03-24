import { PatientRepositoryDatabase } from "../../src/infra/repository/PatientRepository";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import PatientRegister from "../../src/application/usecase/PatientRegister";

test("Should store Patient in database", async function () {
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const register = new PatientRegister(patientRepository);

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

  const outputregister = await register.execute(input);
  const storedPatient = await patientRepository.getByPsychologistId(outputregister.patientId);

  expect(storedPatient?.getPsychologistId()).toBe("9c7f4683-094f-4302-bedd-0725e056cd27");
  expect(storedPatient?.getName()).toBe("John Doe");
  expect(storedPatient?.getBirthdate()).toBe("1994-10-01");
  expect(storedPatient?.getCpf()).toBe("45672354017");
  expect(storedPatient?.getPhone()).toBe("5548988444975");
  expect(storedPatient?.getEmergencyPhone()).toBe("48998753364");
  expect(storedPatient?.getCity()).toBe("Florianopolis");
  expect(storedPatient?.getProvince()).toBe("Santa Catarina");
  expect(storedPatient?.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(storedPatient?.getEmailAddress()).toBe("johndoe@mail.com");

  // Delete patient from database to avoid side effects
  await patientRepository.deleteByCpf("45672354017");
  connection.close();
})

test("Should delete Patient from database by cpf", async function () {
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const register = new PatientRegister(patientRepository);

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

  const outputregister = await register.execute(input);
  const storedPatient = await patientRepository.getByPsychologistId(outputregister.patientId);

  expect(storedPatient?.getPsychologistId()).toBe("9c7f4683-094f-4302-bedd-0725e056cd27");
  expect(storedPatient?.getName()).toBe("John Doe");
  expect(storedPatient?.getBirthdate()).toBe("1994-10-01");
  expect(storedPatient?.getCpf()).toBe("45672354017");
  expect(storedPatient?.getPhone()).toBe("5548988444975");
  expect(storedPatient?.getEmergencyPhone()).toBe("48998753364");
  expect(storedPatient?.getCity()).toBe("Florianopolis");
  expect(storedPatient?.getProvince()).toBe("Santa Catarina");
  expect(storedPatient?.getAddress()).toBe("Rua das Gaivotas, 1274");
  expect(storedPatient?.getEmailAddress()).toBe("johndoe@mail.com");

  // Delete patient from database to avoid side effects
  await patientRepository.deleteByCpf("45672354017");
  const deletedPatient = await patientRepository.getByPsychologistId(outputregister.patientId);
  expect(deletedPatient).toBeUndefined();
  connection.close();
})

// Skip test to avoid side effects in the database
test.skip("Should not store duplicated Patient in database", async function () {
  // Arrange
  const connection = new PgPromiseAdapter();
  const patientRepository = new PatientRepositoryDatabase(connection);
  const register = new PatientRegister(patientRepository);

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
  await register.execute(input);
  expect(async () => {
    await register.execute(input);
  }).rejects.toThrow(new Error("Patient already exists"));
})

