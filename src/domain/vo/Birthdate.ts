export default class Birthdate {
  private value: string;

  constructor(birthdate: string) {
    if (this.isInvalidBirthdate(birthdate)) throw new Error("Invalid birthdate");
    this.value = birthdate;
  }

  private isInvalidBirthdate(birthdate: string) {
    return !birthdate.match(/\d{4}-\d{2}-\d{2}/);
  }

  getValue() {
    return this.value;
  }
}