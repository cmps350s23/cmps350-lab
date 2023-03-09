import { BankAccount } from "./bank-account.js";

export class CurrentAccount extends BankAccount {
  static #monthlylFee = 10;

  deductFee() {
    this.balance -= CurrentAccount.#monthlylFee;
  }

  toString() {
    return "Current " + super.toString();
  }

  toJSON() {
    return { ...super.toJSON(), type: "Current" };
  }
}
