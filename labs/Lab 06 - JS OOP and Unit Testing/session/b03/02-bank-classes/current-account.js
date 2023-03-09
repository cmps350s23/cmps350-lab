import { BankAccount } from "./bank-account.js";

export class CurrentAccount extends BankAccount {
  static #monthlyFee = 10;

  // constructor(balance) {
  //   super(balance);
  // }

  deductFee() {
    this.balance -= CurrentAccount.#monthlyFee;
  }

  toString() {
    return "Current " + super.toString();
  }

  toJSON() {
    return { ...super.toJSON(), type: "Current" };
  }
}
