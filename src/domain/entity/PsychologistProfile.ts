import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Name from "../vo/Name";

export default class PsychologistProfile {
  private name: Name;
  private birthdate: Birthdate;
  private cpf: Cpf;
  private phone: string;
  private city: string;
  private province: string;
  private address: string;

  private constructor(
    readonly userId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    city: string,
    province: string,
    address: string
  ) {
    this.name = new Name(name);
    this.birthdate = new Birthdate(birthdate);
    this.cpf = new Cpf(cpf);
    this.phone = phone;
    this.city = city;
    this.province = province;
    this.address = address;
  }

  static create(
    userId: string,
    name: string,
    birthdate: string,
    cpf: string,
    phone: string,
    city: string,
    province: string,
    address: string
  ) {
    return new PsychologistProfile(
      userId,
      name,
      birthdate,
      cpf,
      phone,
      city,
      province,
      address
    )
  }

  static restore(userId: string, name: string, birthdate: string, cpf: string,
    phone: string, city: string, province: string, address: string) {
    return new PsychologistProfile(userId, name, birthdate, cpf, phone, city, province, address);
  }

  getName() { return this.name.getValue(); }
  getBirthdate() { return this.birthdate.getValue(); }
  getCpf() { return this.cpf.getValue(); }
  getAddress() { return this.address; }
  getPhone() { return this.phone; }
  getCity() { return this.city; }
  getProvince() { return this.province; }
  getUserId() { return this.userId; }
}