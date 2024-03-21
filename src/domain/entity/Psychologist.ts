import Birthdate from "../vo/Birthdate";
import Cpf from "../vo/Cpf";
import Email from "../vo/Email";
import Name from "../vo/Name";
import User from "./User";

export default class Psychologist extends User {
  private name: Name;
  private birthdate: Birthdate;
  private cpf: Cpf;
  private phone: string;
  private city: string;
  private province: string;
  private emailAddress: Email;
  private address: string;

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
    this.emailAddress = new Email(emailAddress);
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
      emailAddress,
      address
    )
  }
  getCreatedAt() { return this.createdAt; }
  getUsername() { return this.username.getValue(); }
  getPassword() { return this.password.getValue(); }
  getName() { return this.name.getValue(); }
  getBirthdate() { return this.birthdate.getValue(); }
  getCpf() { return this.cpf.getValue(); }
  getEmailAddress() { return this.emailAddress.getValue(); }
  getAddress() { return this.address; }
  getPhone() { return this.phone; }
  getCity() { return this.city; }
  getProvince() { return this.province; }
  getAccountId() { return this.accountId; }
}