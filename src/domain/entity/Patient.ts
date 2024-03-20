import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Name from "../vo/Name";

export default class Patient {
  psychologistId: string;
  name: Name;
  birthdate: Birthdate;
  cpf: Cpf;
  phone: string;
  emergencyPhone: string
  city: string;
  province: string;
  emailAddress: string;
  address: string;

  private constructor(
    psychologistId: string,
    readonly accountId: string,
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
    this.emailAddress = emailAddress;
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
    const accountId = crypto.randomUUID();
    return new Patient(
      psychologistId,
      accountId,
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
}