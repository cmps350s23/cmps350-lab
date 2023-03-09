import { CurrentAccount } from "./current-account.js";
import { SavingsAccount } from "./savings-account.js";

export class Bank {
  #accounts = [];

  add(account) {
    this.#accounts.push(account);
  }

  getAccount(accountNo) {
    return this.#accounts.find((a) => a.accountNo === accountNo);
  }

  deleteAccount(accountNo) {
    const index = this.#accounts.findIndex((a) => a.accountNo === accountNo);
    if (index !== -1) {
      this.#accounts.splice(index, 1);
    }
  }

  avgBalance() {
    return totalBalance() / this.#accounts.length;
  }

  totalBalance() {
    return this.#accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  distributeBenefit() {}

  deductFee() {}

  toString() {
    return this.#accounts.map((a) => a.toString()).join("\n");
  }

  toJSON() {
    return this.#accounts;
  }

  fromJSON(text) {
    this.#accounts = JSON.parse(text).map((d) =>
      d.type === "Current"
        ? new CurrentAccount(d.balance)
        : new SavingsAccount(d.balance)
    );
  }
}
