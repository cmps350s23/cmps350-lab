import { Bank } from "./bank.js";
import { CurrentAccount } from "./current-account.js";
import { SavingsAccount } from "./savings-accounts.js";

// const balances = [1000, 4000, 3500];
// const accounts = balances.map((b) => new BankAccount(b));

// accounts.forEach((a) => console.log(a.toString()));

const accounts = [
  {
    accountNo: 123,
    balance: 500,
    type: "Savings",
  },
  {
    accountNo: 234,
    balance: 4000,
    type: "Current",
  },
  {
    accountNo: 345,
    balance: 35000,
    type: "Current",
  },
  {
    accountNo: 456,
    balance: 60000,
    type: "Savings",
  },
];

const bank = new Bank();
accounts.forEach((a) =>
  bank.add(
    a.type === "Current"
      ? new CurrentAccount(a.balance)
      : new SavingsAccount(a.balance)
  )
);

console.log(JSON.stringify(bank));
console.log(JSON.parse(JSON.stringify(bank)));
