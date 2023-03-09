// import { SavingsAccount } from "./savings-this.#accounts.js";
// import { CurrentAccount } from "./current-account.js";

export class Bank {
  #accounts;

  constructor(accounts = []) {
    this.#accounts = accounts;
  }

  add(account) {
    this.#accounts.push(account);
  }

  getAccount(accountNo) {
    return this.#accounts.find((a) => a.accountNo === accountNo);
  }

  deleteAccount(accountNo) {
    // const account = this.#accounts.find((a) => a.accountNo === accountNo);

    const index = this.#accounts.findIndex((a) => a.accountNo === accountNo);
    if (index !== -1) {
      this.#accounts.splice(index, 1);
    }

    // this.#accounts = this.#accounts.filter((a) => a.accountNo !== accountNo);
  }

  totalBalance() {
    return this.#accounts.reduce((tot, acc) => tot + acc.balance, 0);
  }

  avgBalance() {
    return totalBalance() / this.#accounts.length;
  }

  toJSON() {
    return this.#accounts;
  }

  fromJSON(str) {
    this.#accounts = JSON.parse(str);
  }
}
