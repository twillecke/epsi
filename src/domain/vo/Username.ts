export default class Username {
  private value: string;

  constructor(username: string) {
    if (this.isInvalidUsername(username)) throw new Error("Invalid username");
    this.value = username;
  }

  private isInvalidUsername(username: string) {
    return !username || username.length < 7 || username.includes(" ");
  }

  getValue() {
    return this.value;
  }
}