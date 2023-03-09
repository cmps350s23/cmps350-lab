export class BankAccount {
  #accountNo;
  #balance;

  constructor(balance) {
    this.#accountNo = Math.floor(Math.random() * 10000000);
    this.#balance = balance;
  }

  get accountNo() {
    return this.#accountNo;
  }

  get balance() {
    this.#balance;
  }

  set balance(newBalance) {
    this.#balance = newBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    } else {
      // notification
    }
  }

  withdraw(amount) {
    if (amount > 0) {
      if (this.#balance >= amount) {
        this.#balance -= amount;
      }
    } else {
      // notification
    }
  }

  toString() {
    return `Account #${this.#accountNo} has QR${this.#balance}`;
  }
}
