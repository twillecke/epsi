import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Email from "../vo/Email";
import Name from "../vo/Name";

export default class Patient {
  private psychologistId: string;
  private name: Name;
  private birthdate: Birthdate;
  private cpf: Cpf;
  private phone: string;
  private emergencyPhone: string
  private city: string;
  private province: string;
  private emailAddress: Email;
  private address: string;

  private constructor(
    psychologistId: string,
    readonly patientId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    emergencyPhone: string,
    city: string,
    province: string,
    emailAddress: string,
    address?: string,
  ) {
    this.psychologistId = psychologistId;
    this.name = new Name(name);
    this.birthdate = new Birthdate(birthdate);
    this.cpf = new Cpf(cpf);
    this.phone = phone;
    this.emergencyPhone = emergencyPhone;
    this.city = city;
    this.province = province;
    this.emailAddress = new Email(emailAddress);
    (address) ? this.address = address : this.address = "";
  }

  static create(
    psychologistId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    emergencyPhone: string,
    city: string,
    province: string,
    emailAddress: string,
    address: string
  ) {
    const patientId = crypto.randomUUID();
    return new Patient(
      psychologistId,
      patientId,
      name,
      birthdate,
      cpf,
      phone,
      emergencyPhone,
      city,
      province,
      address,
      emailAddress
    )
  }

  static restore(psychologistId: string, patientId: string, name: string, birthdate: string, cpf: string, phone: string, emergencyPhone: string, city: string, province: string, emailAddress: string, address: string) {
    return new Patient(psychologistId, patientId, name, birthdate, cpf, phone, emergencyPhone, city, province, emailAddress, address);
  }

  getName() { return this.name.getValue(); }
  getBirthdate() { return this.birthdate.getValue(); }
  getCpf() { return this.cpf.getValue(); }
  getEmailAddress() { return this.emailAddress.getValue(); }
  getAddress() { return this.address; }
  getPhone() { return this.phone; }
  getEmergencyPhone() { return this.emergencyPhone; }
  getCity() { return this.city; }
  getProvince() { return this.province; }
  getPatientId() { return this.patientId; }
  getPsychologistId() { return this.psychologistId; }

}