import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Name from "../vo/Name";
import User from "./User";

export default class Psychologist extends User {
  name: Name;
  birthdate: Birthdate;
  cpf: Cpf;
  phone: string;
  city: string;
  province: string;
  emailAddress: string;
  address: string;

  private constructor(
    username: string,
    password: string,
    readonly accountId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    city: string,
    province: string,
    emailAddress: string,
    address?: string,
  ) {
    super(username, password);
    this.name = new Name(name);
    this.birthdate = new Birthdate(birthdate);
    this.cpf = new Cpf(cpf);
    this.phone = phone;
    this.city = city;
    this.province = province;
    this.emailAddress = emailAddress;
    (address) ? this.address = address : this.address = "";
  }

  static create(
    username: string,
    password: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    city: string,
    province: string,
    emailAddress: string,
    address: string
  ) {
    const accountId = crypto.randomUUID();
    return new Psychologist(
      username,
      password,
      accountId,
      name,
      birthdate,
      cpf,
      phone,
      city,
      province,
      address,
      emailAddress
    )
  }
  getName() { return this.name.getValue() };
  getBirthday() { return this.birthdate.getValue() };
  getCpf() { return this.cpf.getValue() }

}