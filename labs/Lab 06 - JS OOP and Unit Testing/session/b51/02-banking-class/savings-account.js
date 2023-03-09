import { BankAccount } from "./bank-account.js";

export class SavingsAccount extends BankAccount {
  static #minBalance = 500;
  static #benefitPercentage = 0.05;

  distributeBenefit() {
    this.balance += 1 + SavingsAccount.#benefitPercentage;
  }

  withdraw(amount) {
    if (amount > 0) {
      if (this.balance - amount >= SavingsAccount.#minBalance) {
        this.balance -= amount;
      }
    }
  }

  toString() {
    return "Savings " + super.toString();
  }
}
