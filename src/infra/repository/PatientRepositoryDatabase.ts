import PatientRepository from "src/domain/repository/PatientRepository";
import Patient from "../../domain/entity/Patient";
import DatabaseConnection from "../database/DatabaseConnection";

export class PatientRepositoryDatabase implements PatientRepository {

  constructor(readonly connection: DatabaseConnection) {
  }

  async save(patient: Patient) {
    await this.connection.query("insert into epsi.patient (psychologist_id, patient_id, name, birthdate, cpf, phone, emergency_phone, city, province, email_address, address) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [patient.getPsychologistId(), patient.getPatientId(), patient.getName(), patient.getBirthdate(), patient.getCpf(), patient.getPhone(), patient.getEmergencyPhone(), patient.getCity(), patient.getProvince(), patient.getEmailAddress(), patient.getAddress()]);
  }

  async getByEmail(emailAddress: string) {
    const [patient] = await this.connection.query("select psychologist_id, patient_id, name, birthdate, cpf, phone, emergency_phone, city, province, email_address, address from epsi.patient where email_address = $1", [emailAddress]);
    if (!patient) return;
    return Patient.restore(patient.psychologist_id, patient.patient_id, patient.name, patient.birthdate, patient.cpf, patient.phone, patient.emergency_phone, patient.city, patient.province, patient.email_address, patient.address);
  }

  async getByCpf(cpf: string) {
    const [patient] = await this.connection.query("select psychologist_id, patient_id, name, birthdate, cpf, phone, emergency_phone, city, province, email_address, address from epsi.patient where cpf = $1", [cpf]);
    if (!patient) return;
    return Patient.restore(patient.psychologist_id, patient.patient_id, patient.name, patient.birthdate, patient.cpf, patient.phone, patient.emergency_phone, patient.city, patient.province, patient.email_address, patient.address);
  }

  async getByPsychologistId(psychologistId: string) {
    const patients = await this.connection.query("select psychologist_id, patient_id, name, birthdate, cpf, phone, emergency_phone, city, province, email_address, address from epsi.patient where psychologist_id = $1", [psychologistId]);
    if (!patients) return;
    return patients.map((patient: any) => Patient.restore(patient.psychologist_id, patient.patient_id, patient.name, patient.birthdate, patient.cpf, patient.phone, patient.emergency_phone, patient.city, patient.province, patient.email_address, patient.address));
  }

  async deleteByCpf(cpf: string): Promise<void> {
    await this.connection.query("delete from epsi.patient where cpf = $1", [cpf]);
  }
}