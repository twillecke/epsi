import PatientRepository from "src/infra/repository/PatientRepository";
import Patient from "../../domain/entity/Patient";

/**
 * 1. Psychologist (user) must be logged in to register a patient
 * 2. All patients must to be associated to a Pscyhologist account (psychologistId)
 */

export default class PatientRegister {
  constructor(readonly patientRepository: PatientRepository) { }

  async execute(input: any) {
    console.log("patient register", input);
    const existingPatient = await this.patientRepository.getByCpf(input.cpf);
    if (existingPatient) throw new Error("Patient already exists");
    const patient = Patient.create(input.psychologistId, input.name, input.birthdate, input.cpf, input.phone, input.emergencyPhone, input.city, input.province, input.address, input.emailAddress);
    await this.patientRepository.save(patient);
    return {
      patientId: patient.getPsychologistId()
    }
  }
}