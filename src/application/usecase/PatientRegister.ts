import PatientRepository from "src/domain/repository/PatientRepository";
import Patient from "../../domain/entity/Patient";

/**
 * 1. Psychologist (user) must be logged in to register a patient
 * 2. All patients must to be associated to a Pscyhologist account (psychologistId)
 * 3. Therefore the psychologistId must be passed as a parameter to the patient register use case
 */

type PatiengRegisterInput = {
  psychologistId: string,
  name: string,
  birthdate: string,
  cpf: string,
  phone: string,
  emergencyPhone: string,
  city: string,
  province: string,
  address: string,
  emailAddress: string
}

export default class PatientRegister {
  constructor(readonly patientRepository: PatientRepository) { }

  async execute(input: PatiengRegisterInput) {
    console.log("patient register", input);
    const existingPatient = await this.patientRepository.getByCpf(input.cpf);
    if (existingPatient) throw new Error("Patient already exists");
    const patient = Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress);
    await this.patientRepository.save(patient);
    return {
      psychologistId: patient.getPsychologistId()
    }
  }
}