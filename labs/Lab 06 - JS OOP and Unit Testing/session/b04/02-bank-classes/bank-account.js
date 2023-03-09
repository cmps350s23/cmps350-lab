export class BankAccount {
  #accountNo;
  #balance;

  constructor(balance = 0) {
    this.#accountNo = Math.floor(Math.random() * 1_000_000_000);
    this.#balance = balance;
  }

  // constructor(accountNo, balance) {
  //   this.#accountNo = accountNo;
  //   this.#balance = balance;
  // }

  get accountNo() {
    return this.#accountNo;
  }

  set accountNo(accountNo) {
    this.#accountNo = accountNo;
  }

  get balance() {
    return this.#balance;
  }

  set balance(bal) {
    this.#balance = bal;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  withdraw(amount) {
    if (amount > 0 && this.#balance >= amount) {
      this.#balance -= amount;
    }
  }

  toString() {
    return `Account ${this.#accountNo} has QR${this.#balance.toLocaleString()}`;
  }

  toJSON() {
    return {
      accountNo: this.#accountNo,
      balance: this.#balance,
    };
  }
}

// const account = new BankAccount(1000);
// account.balance;
