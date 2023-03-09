import { BankAccount } from "./bank-account.js";

export class CurrentAccount extends BankAccount {
  static #monthlyFee = 10;

  static setMonthlyFee(fee) {
    CurrentAccount.#monthlyFee = fee;
  }

  deductFee() {
    this.balance -= CurrentAccount.#monthlyFee;
  }

  toString() {
    return "Current " + super.toString();
  }
}
