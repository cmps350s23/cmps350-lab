import { BankAccount } from "./bank-account.js";
import { CurrentAccount } from "./current-account.js";
import { SavingsAccount } from "./savings-account.js";
import { Bank } from "./bank.js";

// const balances = [1000, 4000, 3500];
// const accounts = balances.map((b) => new BankAccount(b));

const details = [
  {
    balance: 500,
    type: "Savings",
  },
  {
    balance: 4000,
    type: "Current",
  },
  {
    balance: 35000,
    type: "Current",
  },
  {
    balance: 60000,
    type: "Savings",
  },
];

const accounts = details.map((d) =>
  d.type === "Current"
    ? new CurrentAccount(d.balance)
    : new SavingsAccount(d.balance)
);

// console.log(accounts);
// accounts.forEach((a) => console.log(a.toString()));

const bank = new Bank();
accounts.forEach((a) => bank.add(a));
console.log(bank.toString());
console.log(JSON.stringify(bank));

bank.fromJSON(JSON.stringify(bank));
console.log(bank.toString());
