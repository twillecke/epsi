import PatientRepository from "../../../src/domain/repository/PatientRepository";
import Patient from "../../../src/domain/entity/Patient";

export default class PatientRepositoryMemory implements PatientRepository {
  patients: Patient[]
  constructor() {
    this.patients = [];
  }

  async save(patient: Patient) {
    this.patients.push(patient);
  }

  async getByEmail(emailAddress: string) {
    return this.patients.find(patient => patient.getEmailAddress() === emailAddress);
  }

  async getByCpf(cpf: string) {
    return this.patients.find(patient => patient.getCpf() === cpf);
  }

  async getByPsychologistId(psychologistId: string) {
    const [patient] = this.patients.filter(patient => patient.getPsychologistId() === psychologistId);
    if (!patient) return;
    return patient;
  }

  async deleteByCpf(cpf: string) {
    this.patients = this.patients.filter(patient => patient.getCpf() !== cpf);
  }
}
