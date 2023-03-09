import { BankAccount } from "./bank-account.js";

export class SavingsAccount extends BankAccount {
  static #minBalance = 500;
  static #benefitPercentage = 0.05;

  // constructor(balance) {
  //   super(balance);
  // }

  withdraw(amount) {
    if (amount > 0 && this.balance - amount >= SavingsAccount.#minBalance) {
      this.balance -= amount;
    }
  }

  distributeBenefit() {
    this.balance *= 1 + SavingsAccount.#benefitPercentage;
  }

  toString() {
    return "Savings " + super.toString();
  }

  toJSON() {
    return { ...super.toJSON(), type: "Savings" };
  }
}
