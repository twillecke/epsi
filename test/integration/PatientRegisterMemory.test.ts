import PatientRegister from "../../src/application/usecase/PatientRegister";
import PatientRepositoryMemory from "../../src/infra/repository/PatientRepositoryMemory";

test("Should store Patient in memory", async function () {
  const patientRepositoryMemory = new PatientRepositoryMemory();
  const register = new PatientRegister(patientRepositoryMemory);

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
  const storedPatient = await patientRepositoryMemory.getByPsychologistId(outputregister.psychologistId);

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

  // Delete patient from memory to avoid side effects
  await patientRepositoryMemory.deleteByCpf("45672354017");
})

test("Should delete Patient from memory by cpf", async function () {
  const patientRepositoryMemory = new PatientRepositoryMemory();
  const register = new PatientRegister(patientRepositoryMemory);

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
  const storedPatient = await patientRepositoryMemory.getByPsychologistId(outputregister.psychologistId);

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

  // Delete patient from memory to avoid side effects
  await patientRepositoryMemory.deleteByCpf("45672354017");
  const deletedPatient = await patientRepositoryMemory.getByPsychologistId(outputregister.psychologistId);
  expect(deletedPatient).toBeUndefined();
})

test("Should not store duplicated Patient in memory", async function () {
  // Arrange
  const patientRepositoryMemory = new PatientRepositoryMemory();
  const register = new PatientRegister(patientRepositoryMemory);

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

