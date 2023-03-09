import { BankAccount } from "./bank-account.js";

export class CurrentAccount extends BankAccount {
  static #monthlyFee = 10;

  // constructor(balance) {
  //   super(balance);
  // }

  setMonthlyFee(fee) {}

  deductFee() {
    this.balance -= CurrentAccount.#monthlyFee;
  }

  toString() {
    return "Current " + super.toString();
  }
}
