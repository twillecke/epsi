export default class Password {
  private value: string;

  constructor(password: string) {
    if (this.isInvalidPassword(password)) throw new Error("Invalid password");
    this.value = password;
  }

  private isInvalidPassword(password: string) {
    // password mush have at least 8 characters, one uppercase letter, one lowercase letter, 
    // one number and one special character
    return !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  }

  getValue() {
    return this.value;
  }
}