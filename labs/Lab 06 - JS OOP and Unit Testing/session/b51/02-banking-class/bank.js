export class Bank {
  #accounts = [];

  add(account) {
    // if (account.accountNo && account.balance && account.type) {
    this.#accounts.push(account);
    // }
  }

  getAccount(accountNo) {
    return this.#accounts.find((acc) => accountNo === acc.accountNo);
  }

  deleteAccount(accountNo) {
    // first method: using filter
    this.#accounts = this.#accounts.filter(
      (acc) => accountNo !== acc.accountNo
    );

    // second method: using splice
    const index = this.#accounts.findIndex(
      (acc) => accountNo === acc.accountNo
    );
    if (index !== -1) {
      this.#accounts.splice(index, 1);
      // delete this.#accounts[index];
    }
  }

  totalBalance() {
    return this.#accounts.reduce((sum, obj) => sum + obj.balance, 0);
  }

  avgBalance() {
    if (this.#accounts.length) {
      return this.totalBalance() / this.#accounts.length;
    } else {
      return 0;
    }
  }

  distributeBenefits() {}

  deductFee() {}

  toJSON() {
    return JSON.stringify(this.#accounts);
  }

  fromJSON(accs) {
    this.#accounts = JSON.parse(accs);
  }

  toString() {
    return this.#accounts.map((acc) => acc.toString()).join("\n");
  }
}
