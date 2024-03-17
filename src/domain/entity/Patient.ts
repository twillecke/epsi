import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Name from "../vo/Name";

export default class Patient {
  name: Name;
  birthdate: Birthdate;
  cpf: Cpf;
  phone: string;
  emergencyPhone: string
  city: string;
  state: string;
  address: string;
  emailAddress: string

  private constructor(
    readonly accountId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    emergencyPhone: string,
    city: string,
    state: string,
    emailAddress: string,
    address?: string,
  ) {
    this.name = new Name(name);
    this.birthdate = new Birthdate(birthdate);
    this.cpf = new Cpf(cpf);
    this.phone = phone;
    this.emergencyPhone = emergencyPhone;
    this.city = city;
    this.state = state;
    this.emailAddress = emailAddress;
    (address) ? this.address = address : this.address = "";
  }

  static create(
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    emergencyPhone: string,
    city: string,
    state: string,
    emailAddress: string,
    address: string
  ) {
    const accountId = crypto.randomUUID();
    return new Patient(
      accountId,
      name,
      birthdate,
      cpf,
      phone,
      emergencyPhone,
      city,
      state,
      address,
      emailAddress
    )
  }
}