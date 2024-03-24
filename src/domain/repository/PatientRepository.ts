import Patient from "../entity/Patient";

export default interface PatientRepository {
  save(patient: Patient): Promise<void>;
  getByEmail(email: string): Promise<Patient | undefined>;
  getByCpf(cpf: string): Promise<Patient | undefined>;
  getByPsychologistId(patientId: string): Promise<Patient | undefined>;
  deleteByCpf(cpf: string): Promise<void>;
}