import { SavingsAccount } from "./savings-account.js";
import { CurrentAccount } from "./current-account.js";

export class Bank {
  #accounts = [];

  // constructor() {
  // }

  add(account) {
    if (account instanceof SavingsAccount || account instanceof CurrentAccount)
      this.#accounts.push(account);
  }

  getAccount(accountNo) {
    return this.#accounts.find((acc) => acc.accountNo === accountNo);
  }

  deleteAccount(accountNo) {
    // this.#accounts = this.#accounts.filter(acc => acc.accountNo !== accountNo);

    const index = this.#accounts.findIndex(
      (acc) => acc.accountNo === accountNo
    );
    if (index !== -1) {
      this.#accounts.splice(index, 1);

      // delete this.#accounts[index];
    }
  }

  totalBalance() {
    return this.#accounts.reduce((acc, val) => acc + val.balance, 0);
  }

  avgBalance() {
    return totalBalance() / this.#accounts.length;
  }

  deductFee() {}

  distributeBenefit() {}

  toJSON() {
    return JSON.stringify(this.#accounts);
  }

  fromJSON(str) {
    this.#accounts = JSON.parse(str);
  }

  toString() {
    return this.#accounts.map((acc) => acc.toString()).join("\n");
  }
}
