export class BankAccount {
  #accountNo;
  #balance;

  constructor(balance = 0) {
    this.#accountNo = Math.floor(Math.random() * 10000000);
    this.#balance = balance;
  }

  get accountNo() {
    return this.#accountNo;
  }

  get balance() {
    return this.#balance;
  }

  set balance(bal) {
    this.#balance = bal;
  }

  deposit(amount) {
    if (amount <= 0) {
      return;
    }
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount <= 0) {
      return;
    }
    if (this.#balance >= amount) {
      this.#balance -= amount;
    }
  }

  toString() {
    return `Account #${this.#accountNo} has QR${this.#balance}`;
  }
}
